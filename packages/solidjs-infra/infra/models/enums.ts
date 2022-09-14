export enum Axis {
    X = 1,
    Y = 2
}

export enum DragStatus {
    None = 1,
    Started = 2,
    Move = 3
}

export enum ServerResponseStatus {
    None = 1,
    Responded = 2
}

export enum Direction {
    Left = 1,
    Right = 2
}

export enum RangeSelectionDirection {
    Up = 1,
    Down = 2
}

export enum AreaToClearPosition {
    AboveSelection = 1,
    BelowSelection = 2
}

export enum IdxPosition {
    Prev = 1,
    Next = 2,
    First = 3,
    Last = 4
}

export enum PopupType {
    Down = 1
}

export enum AlignmentPosition {
    RefStart = 1,
    LeftToRef = 2,
    RightToRef = 3
}

export enum ModalOpeningDirection {
    Above = 1,
    Right = 2,
    Below = 3,
    Left = 4
}

export enum OneShotLoop {
    OneShot = 1,
    Loop = 2,
    None = 3
}
export enum SampleStatus {
    Scanned = 1,
    Analyzed = 2,
    UnsupportedLongDuration = 6,
    Corrupted = 8,
    Deleted = 9
}

export enum Scale {
    Minor = 1,
    Major = 2,
    None = 3
}

// Don't change the order, this is the order in reality.
export enum Flat_None_Sharp {
    Flat = 1,
    None = 2,
    Sharp = 3
}

export enum MathAction {
    Add = 1,
    Subtract = 2
}

export enum ArrowOrEnter {
    ENTER = 1,
    ARROW = 2
}

export enum InputInRow {
    MinInControlRange = 1,
    MaxInControlRange = 2,
    MinInMacroScale = 3,
    MaxInMacroScale = 4
}

export enum AddOrRemove {
    Add = 1,
    Remove = 2,
}

export enum AddOrRename {
    Rename = 1,
    Add = 2
}

export enum SortDirection {
    Ascending = 1,
    Descending = 2
}

export enum AllItemsOrNoneSelected {
    None = 0,
    All = 1
}

export enum SelectionStatus {
    None = 0,
    Partly = 1,
    Fully = 2
}

export enum ConfirmIcon {
    Confirm = 0,
    Plus = 1
};

export enum RawMenuType {
    eMenuItem = 0,
    eSeparator = 1,
    eHeaderTitle = 2,
    eMenuItemFilteredInSearch = 3,
    eNumOfSlotMenuType = 4
};

export enum ActivateAllOrNoneEnum {
    ALL = 1,
    NONE = 2
}
