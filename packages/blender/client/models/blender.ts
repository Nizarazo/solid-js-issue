import { Accessor } from "solid-js";

export enum onOff {
    Off = 0,
    On = 1    
};

export interface ChannelProps{
    name: string;
    //knobs: Knob;
    speaker: onOff;
    headphone: onOff;
    //sliderProps: SliderProps;
    sliderValue: Accessor<number>;
    meterValue: Accessor<number>;
    onChange(newValue: number, isFinal: boolean):void;
    isSelected: boolean;
};

export interface BlenderContainer {

    channels: ChannelProps[];
};

/*
export interface GainData {
    valueWithBoundaries: ValueWithBoundaries;
    selected: boolean;
};

export enum ListenStatus {
    None = 0,
    Armed = 1,
    Listening = 2,
    Calculating = 3,
    Fetching = 4
};

export enum GroupsGainType {
    None = -1,
    Vocals = 0,
    Bass = 1,
    Drums = 2,
    Musical = 3
};

export enum LocalOrGlobalBank {
    Local = 0,
    Global = 1
};

export interface BaseMixAssistItem{
    id: string;
    index: number;
    trackName: string;
    selectedPresetIndex: number;
    presets: Preset[];
    scanState: boolean;
    shouldBeScanned: boolean;
    onOff: boolean;
    isPresetLoadingEnabled: boolean;
};

export interface CppMixAssistItem extends BaseMixAssistItem {
    listen: string;
    listenStatus: ListenStatus;
    listenDisabled: boolean;
    listenImageState: number;
    autoInput: boolean;
    globalAutoInput: boolean;
    autoOutput: boolean;
    globalAutoOutput: boolean;
    progress: number;
    timeLeft: string;
    inputGain: number;
    outputGain: number;
    groupIndex: GroupsGainType;
};

export interface MixAssistItem extends BaseMixAssistItem {
    inputGain: GainData;
    outputGain: GainData;
    group: GroupsGainType;
};

export interface BaseMixAssistContainer {

    mixColor: number;
    undo: boolean;
    redo: boolean;
    onOffAll: boolean;
    localOrGlobalBank: LocalOrGlobalBank;
    listenStatus: ListenStatus;
    recalculateDisplay: boolean;
};

export interface CppMixAssistContainer extends BaseMixAssistContainer{
    action: string,
    mixViewInfo: string[];//OldMixAssistItem[];
    numberOfInstaces: number;
    drums: string;
    vocals: string;
    basses: string;
    harmonics: string;
};

export interface MixAssistContainer extends BaseMixAssistContainer{
    mixAssistItems: MixAssistItem[];
    globalAutoOutput: boolean;
    globalAutoInput: boolean;
    listenDisabled: boolean;
    listenInProcess: boolean;
    progress: number;
    timeLeft: string;
    drums: number;
    vocals: number;
    bass: number;
    musical: number;
};
*/