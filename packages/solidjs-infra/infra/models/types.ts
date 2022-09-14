export type ClientMousePosition = {
  xPos: number;
  yPos: number;
};

// North, South, West, East, North west, North west...
export type CompassDirections = "N" | "S" | "W" | "E" | "NW" | "NE" | "SW" | "SE";

export type RenderToggleIcon = (isPressed?:boolean, isDisabled?:boolean, getClassName?:boolean)=>JSX.Element | string;

export type StringOrNum = string | number;

export type Key_Str = "C" | "D" | "E" | "F" | "G" | "A" | "B" | "NONE";

export type Color = { r: number; g: number; b: number; a: number };

export type WaveItemData = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export type SampleDurationUnit = "bar" | "bars" | "sec";
export type LongPressEvensType = "mouse" | "key";

export type WSstatus = "pending" | "closed" | "open";

export type Tuple<
T,
N extends number,
R extends readonly T[] = [],
> = R['length'] extends N ? R : Tuple<T, N, readonly [T, ...R]>;
