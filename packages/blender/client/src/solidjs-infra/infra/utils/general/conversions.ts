export const convertDynamicChangeInStyle = (val: number, unit: string = "px"): string => {        
    return `${val}` + `${unit}`;
}