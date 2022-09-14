import { DragStatus } from '../../../infra/models/enums';
import { CombinedMouseEvent } from '../../events/mouse/mouse';
import { v4 as uuid } from 'uuid';

let _dragStatus: DragStatus = DragStatus.None;
const subscribes: Map<string, ((newDragStatus: DragStatus) => void)> = new Map<string, ((newDragStatus: DragStatus) => void)>();

function updateDragStatus(newDragStatus: DragStatus) {
    _dragStatus = newDragStatus;
    subscribes.forEach(subscribeFunc => {
        subscribeFunc(newDragStatus);
    });
}

export function getDragStatus(): DragStatus {
    return _dragStatus;
}

export function subscribeToDragStatus(onStatusChange: (newDragStatus: DragStatus) => void): string {
    const id = uuid();
    subscribes.set(id, onStatusChange);
    return id;
}

export function unsubscribeFromDragStatus(id: string) {
    subscribes.delete(id);
}

let _mouseUp = null;
let _mouseMove = null;

// TODO - refactor to project code style guidline
function debounce(func, wait, immediate) {
    var timeout;
  
    return function executedFunction() {
      var context = this;
      var args = arguments;
          
      var later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
  
      var callNow = immediate && !timeout;
      
      clearTimeout(timeout);
  
      timeout = setTimeout(later, wait);
      
      if (callNow) func.apply(context, args);
    };
  };

const startDragFunc = (
    event: CombinedMouseEvent,
    onStart: (event: CombinedMouseEvent) => void,
    onDrag: (event: CombinedMouseEvent) => void,
    onEnd: (event: MouseEvent, mouseMoved: boolean) => void,
    onBeforeStart: (event: CombinedMouseEvent) => boolean = null

) => {
    if (onBeforeStart != null && onBeforeStart(event) === false)
        return;
    let disableMouseMove = false;
    let mouseMoved = false;

    const mouseMove = (event: CombinedMouseEvent) => {
        if (event.buttons === 0 || event.which === 0) {
            mouseUp(event);
            return;
        };

        event.preventDefault();

        if (disableMouseMove) return;

        updateDragStatus(DragStatus.Move);
        mouseMoved = true;

        onDrag(event);
    };

    const mouseUp = (event: CombinedMouseEvent) => {
        disableMouseMove = true;

        document.removeEventListener("mouseup", mouseUp);
        _mouseUp = null;

        document.removeEventListener("mousemove", mouseMove);
        _mouseMove = null;

        updateDragStatus(DragStatus.None);
        onEnd(event, mouseMoved);
    };

    if (_mouseMove) {
        document.removeEventListener("mousemove", mouseMove);

    }
    if (_mouseUp) {
        document.removeEventListener("mouseup", mouseUp);
    }

    _mouseUp = mouseUp;
    _mouseMove = mouseMove;

    document.addEventListener("mouseup", mouseUp);
    document.addEventListener("mousemove", mouseMove);

    updateDragStatus(DragStatus.Started);
    onStart(event);
}

export function getDragEvents(
    onStart: (event: CombinedMouseEvent) => void,
    onDrag: (event: CombinedMouseEvent) => void,
    onEnd: (event: MouseEvent, mouseMoved: boolean) => void,
    onBeforeStart: (event: CombinedMouseEvent) => boolean = null): {

        onMouseDown: (event: CombinedMouseEvent) => void
    } {
    return {
        onMouseDown: (e) => { startDragFunc(e, onStart, onDrag, onEnd, onBeforeStart) }
    }
}
export function getDragStartEvent(
    onStart: (event: CombinedMouseEvent) => void,
    onDrag: (event: CombinedMouseEvent) => void,
    onEnd: (event: MouseEvent, mouseMoved: boolean) => void,
    onBeforeStart: (event: CombinedMouseEvent) => boolean = null): (event: CombinedMouseEvent) => void {
    return (e) => { startDragFunc(e, onStart, onDrag, onEnd, onBeforeStart) }
}
