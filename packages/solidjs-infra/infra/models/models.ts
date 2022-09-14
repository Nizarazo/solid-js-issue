import { Key_Str, LongPressEvensType } from "./../models/types";
import { Scale, Flat_None_Sharp, MathAction } from "./../models/enums";

export interface OnLoadFinishedRes {
    state?:string;
    wpsAddress: string;
    wlsAddress: string;
    uniqueId: string;
  }

export interface SvgIconProps {
    className?: string;
    onClick?: () => void;
    stopPropogationOnDoubleClick?: boolean;
    shouldHide?:boolean;
}

export interface SvgToggleIconProps extends SvgIconProps {
    isPressed?: boolean;
}

export interface IconWithDynamicFill extends SvgIconProps {
fill?: string;
}

export interface SvgOnOffToggleIconProps extends SvgIconProps {
isOn?: boolean;
}

export interface RectPoistion {
    left: number;
    bottom: number;
}

export interface VolumeData {
volume: number;
isMuted: boolean;
}

export interface LoginData {
user_name: string;
error_message: string;
}

export interface SavedVolumeData {
volume_data: VolumeData;
}

export interface BaseStyle {
    width: number;
    height: number;
  }
  
export interface LabelValueObj {
label: string;
value: number;
}

export interface SampleKeyLabelValueObj {
value: number;
label: Key_Str;
}

export interface LabelValueObjWithChildren extends LabelValueObj {
children?: LabelValueObjWithChildren[];
}

export interface Instruments {
all_instrument: LabelValueObj[];
most_used: LabelValueObjWithChildren[];
}

export interface KeyAttrObjProps {
key: Key_Str;
scale: Scale;
flatSharp: Flat_None_Sharp;
}

export interface KeyFlatSharpPair {
key: Key_Str;
flat_sharp: Flat_None_Sharp;
}
  
export interface MinMaxNumber {
    min: number;
    max: number;
}

export interface MinMaxTitle {
    min: string;
    max: string;
}

export interface MsToMinTimeObj {
    ms: number;
    seconds: number;
    min: number;
}

export interface LongPressProps {
    startValue: number;
    action: MathAction;
    step: number;
    interval?: number;
    delayFromClick?: number;
    type?: LongPressEvensType;
    onChange: (value: number, isFinal: boolean) => void;
    onEnd?: (value?: number) => void;
}

export enum LoginStatus {
    Pending = 0,
    LoggedIn = 1,
    NotLoggedIn = 2
}

export interface LoginResponse {
    UserName: string;
    url: string;
    IsSucceed?: boolean;
    is_last?: boolean;
    isError?: boolean;
}

export interface LoginState extends LoginResponse {
    loginStatus: LoginStatus;
    userGuid?: string;
}