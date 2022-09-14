import type { Component, createEffect } from 'solid-js';

import "./blender-channel-view.less";
import {ChannelProps} from "../../models/blender"
import Slider from "../solidjs-infra/components/sliders/slider/slider";
import Meter from "../solidjs-infra/components/meter/meter";

//const Channel: Component <ChannelProps> = props => {

//const HelloMessage: Component<{name: string}> = ({name}) => <div>Hello {name}</div>
//https://stackoverflow.com/questions/66065357/typescript-types-for-solid-js-components

const Channel: Component <ChannelProps> = (channelProps) => {

  const slider = {min:-144, max:10, step:1, isVertical:true, scrollFactor:1, avoidPreventDefaultOnScroll:false, circleKnob:false};

  const { name , speaker, headphone, isSelected, sliderValue, meterValue, onChange} = { ...channelProps };

  return (
        <div class="channel">
          {/* Save/Load 
            <div>
              knobs: {isSelected}
            </div>
            <div>
              square
            </div>*/}
            <Meter name="meter1" value={meterValue} min={-200} max={10}></Meter>
            <Slider {...slider} value={sliderValue} onChange={onChange}> </Slider>
            {/*
            <div>
              {name}
            </div>
              <div>
              <div>
                headphone: {headphone}
              </div>
              <div>
                speaker: {speaker}
              </div>
          </div>*/}
        </div>
  );
};

export default Channel;
