import React, { Component } from 'react';
import Title from '../components/Title';
import Caption from '../components/Caption';
import Code from '../components/Code';
import Rx from 'rxjs';
import './AutoTyper.css';
import AutoTyperCode from '../resources/code/AutoTyperCode';

const content = `/* Fibonacci Series */
function* fibonacci() {
  let a = 0, b = 1;
  while (true){
    let result = a + b;
    yield result; /* Output Result */
    a = b;
    b = result;
  }
}
let fib = fibonacci();
fib.next(); // => { value: 1,  done: false }
fib.next(); // => { value: 2,  done: false }
fib.next(); // => { value: 3,  done: false }
fib.next(); // => { value: 5,  done: false }
fib.next(); // => { value: 8,  done: false }
fib.next(); // => { value: 13, done: false }
fib.next(); // => { value: 21, done: false }
// ... Last Till Infinite`;

class AutoTyper extends Component {
  constructor(props) {
    super(props);
    this.state = { currentText: '', subscription: '' };
  }

  componentDidMount() {
    const startAnimation = () => {
      const words$ = Rx.Observable.from(content);
      const delay$ = Rx.Observable.interval(1000).take(1);
      const timer$ = Rx.Observable.interval(50);

      const subscription = words$
        .scan((acc, char) => acc + char)
        .zip(timer$, (char, index) => char)
        .subscribe(
          /* Subscription */
          (content) => {
            this.setState({ currentText: `${content}_` });
            if (this.refs.codeBlock) this.refs.codeBlock.highlight();
          },

          /* onError */
          (error) => console.log(`Error: ${error}`),

          /* onComplete */
          () => {
            delay$.subscribe(() => startAnimation());
          }
        );

      this.setState({ subscription });
    }
  

    startAnimation();
  }

  componentWillUnmount() {
    this.state.subscription.unsubscribe();
  }

  render() {
    return (
      <div className="AutoTyper">
        <Title>Auto Typer Example</Title>

        <div className="content">
          <Caption>Auto Typer Example</Caption>
          <div className="row">
            <div className="half demo">
              <Code ref="codeBlock">{ this.state.currentText }</Code>
            </div>

            <div className="half">
              <Code>{ AutoTyperCode[0] }</Code>
            </div>
          </div>

          <Caption>Auto Typer with Repeat</Caption>
          <div className="row">
            <div className="half"></div>
            <div className="half">
              <Code>{ AutoTyperCode[1] }</Code>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default AutoTyper;
