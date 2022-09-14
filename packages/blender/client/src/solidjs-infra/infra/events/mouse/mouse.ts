import { Axis } from '../../models/enums';
import { ClientMousePosition } from "../../models/types";


export type CombinedMouseEvent =  MouseEvent | any;


export function getMouseAxisData(axis: Axis): (event: CombinedMouseEvent) => { clientAxis: number, movementAxis: number, offsetAxis: number, pageAxis: number, screenAxis: number, axis: number, position(data: { x: number, y: number }): number, screenAxisEdge: number  } {/*{ clientAxis, movementAxis, offsetAxis, pageAxis, screenAxis, axis }*/

    if (axis === Axis.X) {
        return (event: CombinedMouseEvent) => {
            const { clientX, movementX, offsetX, pageX, screenX, x } = event;
            return {
                clientAxis: clientX,
                movementAxis: movementX,
                offsetAxis: offsetX,
                pageAxis: pageX,
                screenAxis: screenX,
                axis: x,
                screenAxisEdge:window.screen.width,
                position:(data: { x: number, y: number })=>{
                    return data.x;
                }
            }
        }
    }
    else {
        return (event: CombinedMouseEvent) => {
            const { clientY, movementY, offsetY, pageY, screenY, y } = event;
            return  {
                clientAxis: clientY,
                movementAxis: movementY,
                offsetAxis: offsetY,
                pageAxis: pageY,
                screenAxis: screenY,
                axis: y,
                screenAxisEdge:window.screen.height,
                position:(data: { x: number, y: number })=>{
                    return data.y;
                }
            };
        }
    }
}


export const getMousePosition =  (e: MouseEvent):ClientMousePosition=> {
  const xPos: number = e.clientX;
  const yPos: number = e.clientY;
  return {xPos, yPos}
}