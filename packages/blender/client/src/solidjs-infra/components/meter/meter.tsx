
import "./meter.less";
import { Accessor, Component} from "solid-js";
import {convertDynamicChangeInStyle} from "../../infra/utils/general/conversions"
import { BaseProps } from "../../models/models"

enum MeterType{
    Light = 0,
    Layers = 1
}

interface BaseMeterProps extends BaseProps {
    name: string;
    value: Accessor<number>;
    min: number;
    max: number;
}

interface MeterProps extends BaseMeterProps {
    type?: MeterType;
}

const Meter: Component <MeterProps> = (meterProps) => {
    
    const {
       type = MeterType.Light //Default
    } = meterProps;
    
    return type === MeterType.Light ? <LightMeter {...meterProps}/> : <LayersMeter {...meterProps}/>;
}

const LightMeter: Component <BaseMeterProps> = (meterProps) => {

    const {
        name,
        value,
        min,
        max,
    } = meterProps;
    
    let meterBackgroundRef: HTMLDivElement | any;

    const getNormalizedValue = () => {
            
            let newValue = value();
            if (newValue > max) {
                newValue = max;
            }
            else if (newValue < min) {
                newValue = min;
            }
            
            return Math.floor(Math.abs(newValue - max)*meterBackgroundRef.getBoundingClientRect().height/ (max - min));
    };

    return (
        <>
            <div class="meter_name">{name}</div>
            <div class="meter_light_background" ref={meterBackgroundRef}></div>
            <div class="meter_light" style={{height: convertDynamicChangeInStyle(getNormalizedValue())}}></div>  
        </>
    );
}

const LayersMeter: Component <BaseMeterProps> = (meterProps) => {

    const {
        name,
        value,
        min,
        max,
    } = meterProps;
    
    let meterBackgroundRef: HTMLDivElement | any;

    const getNormalizedValue = () => {
            
            let newValue = value();
            if (newValue > max) {
                newValue = max;
            }
            else if (newValue < min) {
                newValue = min;
            }
            
            return Math.floor(Math.abs(newValue - max)*meterBackgroundRef.getBoundingClientRect().height/ (max - min));
    };

    return (
        <>
            <div class="meter_name">{name}</div>
            <div class="meter_background" ref={meterBackgroundRef}></div>
            <div class="meter" style={{height: convertDynamicChangeInStyle(getNormalizedValue())}}></div>  
        </>
    );
}
export default Meter;