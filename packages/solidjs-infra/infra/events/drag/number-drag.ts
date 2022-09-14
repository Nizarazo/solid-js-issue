import { getDragEvents } from "./drag";
//import pluginCommunication from "../../services/plugin-communication";
//import { onFocus } from "../../services/focus-funcs";
import { CombinedMouseEvent } from "../mouse/mouse";
import { MinMaxNumber } from "../../models/models";
import { Axis } from "../../../infra/models/enums";
import { getMouseAxisData } from "../mouse/mouse";
import { sleep } from "../../utils/general/async";
import { getBrowserType } from "../../utils/general/detect-broswer";

function updatePosition(
  position: { x: number; y: number },
  event: CombinedMouseEvent
) {
  position.y = event.pageY;
  position.x = event.pageX;
}

export const HIGH_PRECISION: number = 4;
const STEP_DIVIDER: number = 1000;

export function getNumberDragEvents(dragData: {
  startValue: number;
  boundaries: MinMaxNumber;
  step: number;
  onChange: (newValue: number) => void;
  axis: Axis;
  onEnd?: () => void;
  highPrecisionMode?: boolean;
}): {
  onMouseDown: (event: CombinedMouseEvent) => void;
} {

  const { startValue, boundaries, onChange, step, axis, onEnd, highPrecisionMode } = dragData;
  let val = startValue;
  let lastTimeStamp: number;
  const lastPosition: { x: number; y: number } = { x: null, y: null };
  const firstPosition: { x: number; y: number } = { x: null, y: null };
  const mouseAxisData = getMouseAxisData(axis);
  

  const factor = Math.ceil(
    (boundaries.max - boundaries.min) / step / STEP_DIVIDER
  );

  const onStart = (event: CombinedMouseEvent) => {
    // Try was added so it will be possible to test on browser.
    /*try {
      onFocus();
      pluginCommunication.post({ action: "onDragStart", onDragStart: "" });
    } catch (err) { }
    */
    lastTimeStamp = event.timeStamp;
    updatePosition(lastPosition, event);
    updatePosition(firstPosition, event);
  };
  const onDrag = (event: CombinedMouseEvent) => {
    const mouseAxisDataEvent = mouseAxisData(event);
    //console.log({ mouseAxisDataEvent })
    const { pageAxis, screenAxis, screenAxisEdge } = mouseAxisDataEvent;
    const movement = mouseAxisDataEvent.position(lastPosition) - pageAxis;
    const timeStamp = lastTimeStamp;
    lastTimeStamp = event.timeStamp;
    if (movement === 0) {
      return;
    }
    updatePosition(lastPosition, event);
    const dirUp = movement > 0;
    if (
      (dirUp && boundaries.max === val) ||
      (!dirUp && boundaries.min === val)
    ) {
      return;
    }

    const highPrecisionFactor =
      event.metaKey || event.ctrlKey || highPrecisionMode ? 1 : HIGH_PRECISION;
    const movementFactor = Math.round(factor / (event.timeStamp - timeStamp));
    const calculatedMovement = dirUp
      ? Math.max(movementFactor * movement, 1)
      : Math.min(movementFactor * movement, -1);
    const delta = calculatedMovement * step * highPrecisionFactor;

    val += delta;
    if (val > boundaries.max) {
      val = boundaries.max;
    } else if (val < boundaries.min) {
      val = boundaries.min;
    }
    onChange(val);
    if (screenAxis <= 10) {
      /*
      pluginCommunication.post({
        action: "setCursorPosition",
        x: firstPosition.x,
        y: firstPosition.y,
        dragEnded: false,
      });*/
      lastPosition.y = firstPosition.y;
      lastPosition.x = firstPosition.x;
    } else if (screenAxis >= screenAxisEdge - 10) {
      /*pluginCommunication.post({
        action: "setCursorPosition",
        x: firstPosition.x,
        y: firstPosition.y,
        dragEnded: false,
      });*/
      lastPosition.y = firstPosition.y;
      lastPosition.x = firstPosition.x;
    }
  };
  const onEndEvent = () => {
    //pluginCommunication.shouldGetKeyEvents = false;
    /*pluginCommunication.post({
      action: "setCursorPosition",
      x: firstPosition.x - window.pageXOffset,
      y: firstPosition.y - window.pageYOffset,
      dragEnded: true,
    });*/
    if (onEnd) {
      onEnd();
    };
  };
  return getDragEvents(onStart, onDrag, onEndEvent);
}


export function getPixelChange(dragData: {
  onChange: (newValue: number) => void;
  axis: Axis;
  onEnd?: (didMove: boolean) => void;
  highPrecisionMode?: boolean;
}): {
  onMouseDown: (event: CombinedMouseEvent) => void;
} {
  let didMove: boolean = false;
  const { onChange, axis, onEnd, highPrecisionMode } = dragData;
  const lastPosition: { x: number; y: number } = { x: null, y: null };
  const firstPosition: { x: number; y: number } = { x: null, y: null };
  const mouseAxisData = getMouseAxisData(axis);

  const onStart = (event: CombinedMouseEvent) => {
    // Try was added so it will be possible to test on browser.
    try {
      didMove = false;
      //onFocus();
      //pluginCommunication.post({ action: "onDragStart", onDragStart: "" });
    } catch (err) { }
    updatePosition(lastPosition, event);
    updatePosition(firstPosition, event);
  };

  const onDrag = (event: CombinedMouseEvent) => {
    const mouseAxisDataEvent = mouseAxisData(event);
    const { pageAxis, screenAxis, screenAxisEdge } = mouseAxisDataEvent;
    const lastPositionCalc = mouseAxisDataEvent.position(lastPosition);
    let movement = axis === Axis.Y ? lastPositionCalc - pageAxis : pageAxis - lastPositionCalc;

    if (movement === 0) {
      return;
    }

    didMove = true;
    updatePosition(lastPosition, event);

    if (event.metaKey || event.ctrlKey || highPrecisionMode) {
      movement /= HIGH_PRECISION;
    }

    onChange(movement);
    if (screenAxis <= 10) {
      /*pluginCommunication.post({
        action: "setCursorPosition",
        x: firstPosition.x,
        y: firstPosition.y,
        dragEnded: false,
      });*/
      lastPosition.y = firstPosition.y;
      lastPosition.x = firstPosition.x;
    } else if (screenAxis >= screenAxisEdge - 10) {
      /*pluginCommunication.post({
        action: "setCursorPosition",
        x: firstPosition.x,
        y: firstPosition.y,
        dragEnded: false,
      });*/
      lastPosition.y = firstPosition.y;
      lastPosition.x = firstPosition.x;
    }
  };
  const onEndEvent = () => {
    //pluginCommunication.shouldGetKeyEvents = false;
    /*pluginCommunication.post({
      action: "setCursorPosition",
      x: firstPosition.x - window.pageXOffset,
      y: firstPosition.y - window.pageYOffset,
      dragEnded: true,
    });*/
    if (onEnd) {
      onEnd(didMove);
    };
  };
  return getDragEvents(onStart, onDrag, onEndEvent);
}

let lastTime = null;
export function getNumberWheelEvent(dragData: {
  startValue: number;
  boundaries: MinMaxNumber;
  step: number;
  onChange: (newValue: number) => void;
  onEnd?: (newValue: number) => void;
  axis: Axis;
  highPrecisionMode?: boolean;
  suspendTimeTillCallOnEnd?: number;
  scrollFactor?:number;
  avoidPreventDefaultOnScroll?:boolean;
}): (event: React.WheelEvent) => void {
  const {
    startValue,
    boundaries,
    onChange,
    onEnd,
    step,
    axis,
    highPrecisionMode,
    suspendTimeTillCallOnEnd = 350,
    scrollFactor,
    avoidPreventDefaultOnScroll
  } = dragData;
  let val: number = startValue;

  const getScrollFactor = (): number => {
    if (scrollFactor != null) {
      return scrollFactor;
    }
    const browser = getBrowserType();
    if (browser === "ie") {
      return 12;
    } else {
      return 3;
    }
  }

  return async (event: React.WheelEvent) => {
    let d = axis === Axis.Y ? event.deltaY : event.deltaX;
    if (d === 0) return;
    
    d /= getScrollFactor();

    const highPrecisionFactor = event.metaKey || event.ctrlKey || highPrecisionMode ? HIGH_PRECISION : 1;
    d /= highPrecisionFactor;
    if (d < 0 && d > -1) {
      d = -1
    }
    else if (d > 0 && d < 1) {
      d = 1
    }
    const delta = d / highPrecisionFactor * step;
    val += -1 * delta;
    if (val > boundaries.max) {
      val = boundaries.max;
    } else if (val < boundaries.min) {
      val = boundaries.min;
    }
    onChange(val);
    if (!avoidPreventDefaultOnScroll) {
      event.preventDefault();
    }
    
    if (onEnd) {
      const time = Date.now();
      lastTime = time;
      await sleep(suspendTimeTillCallOnEnd);

      if (time === lastTime) {
        lastTime = null;
        onEnd(val);
      }
    }
  };
}
