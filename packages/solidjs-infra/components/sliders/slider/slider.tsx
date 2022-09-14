import { getDragEvents } from "../../../infra/events/drag/drag";
import { getNumberWheelEvent } from "../../../infra/events/drag/number-drag";
import { Axis } from "../../../infra/models/enums";
import { createSignal, createEffect, onMount, Accessor, Component, JSX} from "solid-js";
import classNames from "classnames";
import {convertDynamicChangeInStyle} from "../../../infra/utils/general/conversions"
import { BaseProps } from "../../../models/models";
import "./slider.less";


interface SliderProps extends BaseProps {
    value: Accessor<number>;
    min: number;
    max: number;
    isVertical?: boolean;
    step?: number;
    className?: string;
    circleKnob?: boolean;
    onChange: (newValue: number, isFinal: boolean) => void;
    onDeltaChange?: (newValue: number, isFinal: boolean) => void;
    onReset?: (event: any) => void;
    scrollFactor?: number;
    avoidPreventDefaultOnScroll?: boolean;
    logarithmic?: boolean;
    inverted?: boolean;
    throttle?: boolean;
}

// tode: this should part of style width/height parameters instead of css today
const circleKnobParams = {
    size: 10
}
const knobParams = {
    size: 6
}

/*
interface SliderState {
    offset: number;
    transitionAnimationOnKnob: boolean;
    value: number;
}
*/
let factor = 0;

const Slider: Component <SliderProps> = (sliderProps) => {
    const {
        value,
        min,
        max,
        step = 1,       
        circleKnob,
        isVertical,
        className,
        onChange,
        onReset,
        scrollFactor,
        avoidPreventDefaultOnScroll
    } = sliderProps;

/*
    const [state, setState] = React.useState<SliderState>({
        offset: 0,
        value: value,
        transitionAnimationOnKnob: false
    });
*/
    const [state, setState] = createSignal({transitionAnimationOnKnob:false});
    const [offset, setOffset] = createSignal(0);

    const getCalculatedOffset = (): number => {
        var newCalculatedOffset = 0;
        if (circleKnob) {
            newCalculatedOffset = offset() - (circleKnobParams.size / 2);
        }
        else {
            newCalculatedOffset = (offset() - knobParams.size / 2);
        }
       
        return newCalculatedOffset;
    }

    const updateState = (offset: number, transitionAnimationOnKnob: boolean = false) => {
        setOffset(offset);
        setState({transitionAnimationOnKnob});
    }

    let sliderContainerRef: HTMLDivElement | any; //= React.useRef<HTMLDivElement>(null);
    const getVerticalHorizontalParams = (event: MouseEvent | null): { width: number, start: number, pageStart?: number  } => {
        const rect = sliderContainerRef.getBoundingClientRect();
        console.log({rect});
        if (isVertical) {
            return {
                width: rect.height,
                pageStart: event != null ? event.pageY : undefined,
                start: rect.top
            }
        }
        else {
            return {
                width: rect.width,
                pageStart: event != null ? event.pageX : undefined,
                start: rect.left
            }
        }
    }

    const getValuePosition = (val: number = value()): number => {
        if (isVertical) {
            return 100 - val;
        }
        else {
            return val;
        }
    }

/*
    React.useEffect(() => {
        // TODO: use debounce
        if (getDragStatus() !== DragStatus.Move) {
            const offset: number = factor * (getValuePosition() / step);
            setState({ ...state, value, offset });
        }
    }, [value]);
*/
    createEffect(() => {
        const offset: number = Math.abs(factor * (value() - max) / step);
        updateState(offset);
     //     }
    });
    
/*
    React.useEffect(() => {
        const params = getVerticalHorizontalParams();
        factor = params.width / (max - min) * step;
        const offset: number = factor * (getValuePosition() / step);
        updateState(offset);
    }, []);
*/

    onMount(() => {
        console.log({sliderContainerRef});
        const params = getVerticalHorizontalParams(null);
        factor = params.width / (max - min) * step;
        const offset: number = factor * (getValuePosition() / step);
        updateState(offset);
    });

    const _onChange = (event: MouseEvent, transitionAnimationOnKnob = false, isFinal: boolean = false) => {
        const params = getVerticalHorizontalParams(event);

        if (params.pageStart != undefined)
        {
            let offset =  params.pageStart- params.start;
            let value = Math.round(-(offset/factor) + max);//Math.round(getValuePosition(offset / factor)) * step;
           
            if (value > max) {
                value = max;
            }
            else if (value < min) {
                value = min;
            }
            offset = Math.abs(factor * (value - max) / step);
            onChange(value, isFinal);
            updateState(offset, transitionAnimationOnKnob);
        }
    };
    const sliderWrapperClass = classNames("slider-wrapper", className, { vertical: isVertical });

    return (<div class={sliderWrapperClass}
        onWheel={getNumberWheelEvent({
            startValue: value(),
            boundaries: { min, max },
            step,
            onChange: (newValue: number) => {
                const value = Math.max(Math.min(newValue, max), min);
                onChange(value, false);
                const offset: number = factor * (getValuePosition(value) / step);
                updateState(offset);
                setState({ offset, transitionAnimationOnKnob: false});
            },
            onEnd: (newValue: number) => {
                const value = Math.max(Math.min(newValue, max), min);
                onChange(value, true);
                const offset: number = factor * (getValuePosition(value) / step);
                updateState(offset);
                setState({ offset, transitionAnimationOnKnob: false});
            },
            axis: Axis.Y,
            scrollFactor,
            avoidPreventDefaultOnScroll
        })}
        onMouseDown={(event) => {
            event.preventDefault();
            if (event.altKey) {
                if (onReset){
                    onReset(event);
                }
                return;
            }
            _onChange(event, true, true);
        }}>
        <div
            class={classNames("slider-knob ", { "slider-knob-circle": circleKnob, "do-transition": state().transitionAnimationOnKnob })}
            style={{"left": convertDynamicChangeInStyle(getCalculatedOffset())}}
            {...getDragEvents(
                (event) => {
                    if (event.altKey && onReset) 
                    {
                        onReset(event);
                    }
                    event.preventDefault();
                    event.stopPropagation();
                },
                _onChange,
                (event: MouseEvent, mouseMoved: boolean) => {
                    event.preventDefault();
                    event.stopPropagation();
                    if (mouseMoved) {
                        _onChange(event, true, true);
                    }
                },
                (event) => {
                    return event.altKey === false;
                }
            )}>

        </div>
        <div class={"slider-line"} ref={sliderContainerRef}>
            <div style={{ width:convertDynamicChangeInStyle(offset()) , height: "100%", "border-radius": "3px" }}> </div>
        </div>
        </div>);
};

export default Slider;
