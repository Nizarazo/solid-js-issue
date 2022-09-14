import { StringOrNum } from "././../models/types";
import { MinMaxNumber } from "./../models/models";

export interface IdTitle {
    id: StringOrNum;
    title: string;
}

export interface ValueWithBoundaries {
    value: number;
    selected?: boolean;
    boundaries: MinMaxNumber;
}