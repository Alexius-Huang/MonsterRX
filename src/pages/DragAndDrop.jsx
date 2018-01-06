import React, { Component } from 'react';
import Title from '../components/Title';
import Caption from '../components/Caption';
import Code from '../components/Code';
import Rx from 'rxjs';
import DragAndDropCode from '../resources/code/DragAndDropCode';
import './DragAndDrop.css';

class DragAndDrop extends Component {
  constructor(props) {
    super(props);
    this.state = { position: { left: '50px', top: '50px' } }
  }

  componentDidMount() {
    const el = document.getElementById('draggable');
    const elWrapper = document.getElementById('draggable-wrapper');
    const elWrapperPosition = elWrapper.getBoundingClientRect();

    const mousedown = Rx.Observable.fromEvent(elWrapper, 'mousedown');
    const mouseup = Rx.Observable.fromEvent(document.body, 'mouseup');
    const mousemove = Rx.Observable.fromEvent(document.body, 'mousemove');

    const { clientWidth: width, clientHeight: height } = el;

    /* Dragging Event */
    mousedown
      .map(() => mousemove.takeUntil(mouseup))
      .concatAll()
      .map((event) => ({
        left: event.clientX - elWrapperPosition.x - (width / 2),
        top:  event.clientY - elWrapperPosition.y - (height / 2)
      }))
      .map(({ left, top }) => {
        /* Make sure element stayed in boundary */
        if (left < 0) {
          left = 0;
        } else if (left > elWrapper.clientWidth - width) {
          left = elWrapper.clientWidth - width;
        }

        if (top < 0) {
          top = 0;
        } else if (top > elWrapper.clientHeight - height) {
          top = elWrapper.clientHeight - height;
        }

        return { left: `${left}px` , top: `${top}px` }
      })
      .subscribe((position) => {
        this.setState({ position });
      })

  }

  render() {
    return (
      <div className="DragAndDrop">
        <Title>Drag & Drop Example</Title>

        <div className="content">
          <Caption>Drag & Drop Example</Caption>
          <div className="row">
            <div className="half demo">
              <div className="window-wrapper">
                <div className="top-bar">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>

                <div id="draggable-wrapper" className="window">
                  <div style={ this.state.position } id="draggable">Drag Me</div>
                </div>
              </div>
            </div>
            <div className="half">
              <Code>{ DragAndDropCode[0] }</Code>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DragAndDrop;
