const DragAndDropCode = [
  `/* Get the element and the element of the draggable element's wrapper */
const el = document.getElementById('draggable');
const elWrapper = document.getElementById('draggable-wrapper');

/* Get the client boundary position */
const elWrapperPosition = elWrapper.getBoundingClientRect();

const mousedown = Rx.Observable.fromEvent(elWrapper, 'mousedown');
const mouseup = Rx.Observable.fromEvent(document.body, 'mouseup');
const mousemove = Rx.Observable.fromEvent(document.body, 'mousemove');

/* Get width of the draggable element */
const { clientWidth: width, clientHeight: height } = el;

/* Create Dragging Event */
const ondrag = 
  mousedown
    .map(() => mousemove.takeUntil(mouseup))
    .concatAll()

/* Convert each drag event to position */
onDrag
  .map((event) => ({
    left: event.clientX - elPosition.x - (width / 2),
    top:  event.clientY - elPosition.y - (height / 2)
  }))
  .map(({ left, top }) => {
    /* Make sure element stayed in boundary */
    if (left < 0) {
      left = 0;
    } else if (left > el.clientWidth - width) {
      left = el.clientWidth - width;
    }

    if (top < 0) {
      top = 0;
    } else if (top > el.clientHeight - width) {
      top = el.clientHeight - width;
    }

    return { left: \`\${ left }px\` , top: \`\${ top }px\` }
  })
  .subscribe((position) => {
    /* Custom an update method for updating element position */
    updateElement(position);
  })`,
]

export default DragAndDropCode;