import { createEffect, Component, createSignal, Signal, Accessor, Setter } from 'solid-js';

const socket = new WebSocket("ws://localhost:5000?key=1");

import styles from './App.module.less';
import "./components/blender-channel-view.less";
import Channel from './components/blender-channel-view';
import { onOff } from '../models/blender';
//import xxx from '../.
import { For } from 'solid-js';

const numOfChannels = 10;
const numOfMeters = 10;
const arrOfSignalsAccessor: Array<Accessor<number>> = [];
const arrOfSignalsSetter: Array<Setter<number>> = [];
const arrOfMetersAccessor: Array<Accessor<number>> = [];
const arrOfMetersSetter: Array<Setter<number>> = [];

const channelNames: Array<string> = ["ch1", "ch2", "ch3", "ch4", "ch5", "ch6", "ch7", "ch8", "ch9", "ch10"];

for (let i = 0; i < numOfChannels; i++) {
  const [value, setValue] = createSignal(0);
  arrOfSignalsAccessor[i] = value;
  arrOfSignalsSetter[i] = setValue;
}

for (let i = 0; i < numOfMeters; i++){
  const [meterValue, setMeterValue] = createSignal(0);
  arrOfMetersAccessor[i] = meterValue;
  arrOfMetersSetter[i] = setMeterValue;
}



const dict: Map<string, (obj: any) => void> = new Map<string, (obj: any) => void>();
dict.set("/Notify/Track/Out/Gain", (obj: any) => {
  
  console.log("/Notify/Track/Out/Gain arrived", obj);
  if (obj.trackID >= 0 && obj.trackID < numOfChannels)
  {
    arrOfSignalsSetter[obj.trackID](obj.gainDB);
  }
  else
  {
    console.log("Incorrect trackID range:" + obj.trackID);
  }
})
dict.set("/Notify/Meters", (obj:any) => {
  console.log("/Notify/Meters arrived", obj);
  for (let i = 0; i < obj.numOfMeters; i++){
    arrOfMetersSetter[obj.meters[i].trackID](obj.meters[i].dGain);
  };
})

/*
setInterval(() => {
  const randomnum = Math.floor(Math.random() * (10 - -200 + 1) + -200);
  setMeterValue(randomnum);
  console.log({randomnum});
}, 1);
*/

//let data:string | null;
socket.onmessage = (message) => {
  console.log("here is the message:", message);
  //alert(data());
  const res = JSON.parse(message.data);
  console.log("here is the res:", res);
  const func = dict.get(res.action) as (obj: any) => void;
  func(res);
}

function registerMeters()
{

  const msg:{action:string, numOfMeters:number, meters:{trackID: number, trackType: number, meterType: number, channelIndex: number} []
  } = {
    action: "/Register/Meter",
    numOfMeters: numOfMeters,
    meters:[]
  }

  for (let i = 0; i < numOfMeters; i++){
    msg.meters.push(
      {trackID: i,
      trackType: 0,
      meterType: 1,
      channelIndex: 0}
      );
  };

    console.log("msg", msg);

    // Send the msg object as a JSON-formatted string.
    socket.send(JSON.stringify(msg));
}

//import GlobalIcon from "./global.svg";
const App: Component = () => {

  // createEffect(() => {
  //   console.log("The data is", data());
  // });
  //  setInterval(() => {
  //  setValue(value() + 0.5);
  //    console.log("arrived setinterval")
  //  }, 5000);

  const onChange = (newValue: number, id: number, isFinal: boolean) => {
    //let oldValue = value();
    //console.log("oldValue:", value(), "newvalue:", newValue);

    var msg = {
      action: "/Set/Track/Out/Gain",
      trackID: id,
      trackType: 0,
      gainDB: newValue,
      valid: 1
    };
    console.log("msg", msg);

    // Send the msg object as a JSON-formatted string.
    socket.send(JSON.stringify(msg));
  }

  const _onChange = (index: number) => {
    return (newValue: number, isFinal: boolean) => {
      onChange(newValue, index, isFinal);
    }
  }

  return (
    <div /*class={styles.channel}*/>
      {/*
      <header class={styles.header}>
        <div class={styles.left} >
          <a>
            Save/Load
          </a>
          <a>
            Jennys Stream}
          </a>
        </div>
        <div class={styles.right}>
          <a>
            Save/Load
          </a>
          <a>
            Youtube Live setting
          </a>
        </div>
  </header>*/}
        <button type="button" onClick={registerMeters}>Register meter</button>
        <div class="channels">
        <For each={arrOfSignalsAccessor}>{(obj, i) =>
          <Channel name={channelNames[i()]} speaker={onOff.On} headphone={onOff.Off} isSelected={true} meterValue={arrOfMetersAccessor[i()]} sliderValue={obj} onChange={_onChange(i())}/>
        }</For>
        
        {/* {<Channel channelProps={{name:"ZOOM", speaker:onOff.On, headphone:onOff.On, isSelected:false, sliderProps:slider}} />}
        {<Channel channelProps={{name:"DISCORD", speaker:onOff.On, headphone:onOff.On, isSelected:false, sliderProps:slider}} />}
        {<Channel channelProps={{name:"BROWSER", speaker:onOff.On, headphone:onOff.On, isSelected:false, sliderProps:slider}} />}
        {<Channel channelProps={{name:"MUSIC", speaker:onOff.On, headphone:onOff.On, isSelected:false, sliderProps:slider}} />}
        {<Channel channelProps={{name:"MIC2", speaker:onOff.On, headphone:onOff.On, isSelected:false, sliderProps:slider}} />}
        {<Channel channelProps={{name:"DAW", speaker:onOff.On, headphone:onOff.On, isSelected:false, sliderProps:slider}} />}
        {<Channel channelProps={{name:"V1", speaker:onOff.On, headphone:onOff.On, isSelected:false, sliderProps:slider}} />}
        {<Channel channelProps={{name:"V2", speaker:onOff.On, headphone:onOff.On, isSelected:false, sliderProps:slider}} />}
        {<Channel channelProps={{name:"V3", speaker:onOff.On, headphone:onOff.On, isSelected:false, sliderProps:slider}} />}
        {<Channel channelProps={{name:"V4", speaker:onOff.On, headphone:onOff.On, isSelected:false, sliderProps:slider}} />}
        {<Channel channelProps={{name:"V5", speaker:onOff.On, headphone:onOff.On, isSelected:false, sliderProps:slider}} />} */}
        </div>
      {/*
        <img src={logo} class={styles.logo} alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          class={styles.link}
          href="https://github.com/solidjs/solid"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn Solid
        </a>
        */}
    </div>
  );
};

export default App;
