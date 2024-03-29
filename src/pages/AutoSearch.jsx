import React, { Component } from 'react';
import Title from '../components/Title';
import Caption from '../components/Caption';
import Code from '../components/Code';
import CSSColors from '../resources/CSSColors';
import AutoSearchCode from '../resources/code/AutoSearchCode';
import Rx from 'rxjs';
import './AutoSearch.css';

class AutoSearch extends Component {
  constructor(props) {
    super(props);
    this.state = { input: '', matched: [], debounceTime: 500, subscription: undefined };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleRerun = this.handleRerun.bind(this);
  }

  componentDidMount() {
    /* Subscribe the RxJS when Mounted */
    this.subscribe();
  }

  subscribe() {
    const inputElement = document.getElementById('auto-search-example-input');
    const cancelBtnElement = document.getElementById('auto-search-cancel-btn');
    const rerunBtnElement = document.getElementById('auto-search-rerun-btn');

    const CSSColors$ = Rx.Observable.from(CSSColors);

    const input$ = Rx.Observable.fromEvent(inputElement, 'input');
    const focus$ = Rx.Observable.fromEvent(inputElement, 'focus');
    const cancel$ = Rx.Observable.fromEvent(cancelBtnElement, 'click');
    const rerun$ = Rx.Observable.fromEvent(rerunBtnElement, 'click');
    const { debounceTime } = this.state;

    const subscription = Rx.Observable
      .merge(input$, focus$)
      .debounceTime(debounceTime)
      .takeUntil(rerun$)
      .takeUntil(cancel$)
      .subscribe((e) => {
        let regExp = new RegExp(e.target.value);
        this.setState({ matched: [] });

        /* Take the top 10 searched result */
        CSSColors$
          .filter(data => regExp.test(data))
          .take(10)
          .subscribe(result => {
            const { matched } = this.state;
            matched.push(result);
            this.setState({ matched })
          })
      })

    this.setState({ subscription });
  }

  handleRerun() {
    this.state.subscription.unsubscribe();
    this.setState({ matched: [], subscription: null })
    this.subscribe();
  }

  handleInputChange(event) {
    this.setState({ input: event.target.value });
  }

  componentWillUnmount() {
    this.state.subscription.unsubscribe();
  }

  render() {
    const { input, matched } = this.state;

    return (
      <div className="AutoSearch">
        <Title>Auto Search Example</Title>

        <div className="content">
          <Caption>Auto Search Example</Caption>

          <div className="row">
            <div className="half demo">
              <input
                id="auto-search-example-input"
                type="text"
                onChange={this.handleInputChange}
                value={input}
                placeholder="Search CSS Colors"
              />
              <div className="btn-group">
                <button id="auto-search-rerun-btn" onClick={this.handleRerun}>Rerun RxJS</button>
                <button id="auto-search-cancel-btn">Cancel</button>
              </div>
              <ul className="list">
                {
                  matched.length === 0 ?
                  <li>Empty Result</li>  :
                  matched.map((data, i) => <li key={i}>{data}</li>)
                }
              </ul>
            </div>

            <div className="half">
              <Code>{ AutoSearchCode }</Code>
            </div>
          </div>

          <Caption>Auto Search with Maximum Search Result</Caption>
          <div className="row">
            <div className="full">Working in Progress...</div>
          </div>
        </div>
      </div>
    );
  }
}

export default AutoSearch;
