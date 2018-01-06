const AutoSearchCode = `const inputElement = document.getElementById('auto-search-example-input');
const cancelBtnElement = document.getElementById('auto-search-cancel-btn');

const input$ = Rx.Observable.fromEvent(inputElement, 'input');
const focus$ = Rx.Observable.fromEvent(inputElement, 'focus');
const cancel$ = Rx.Observable.fromEvent(cancelBtnElement, 'click');

/* Event Subscription */
input$
  .merge(focus$)
  .debounceTime(500)
  .takeUntil(cancel$)
  .subscribe((e) => {
    let regExp = new RegExp(e.target.value)
    this.setState({
      matched: CSSColors.filter(data => regExp.test(data))
    })
  });
`

export default AutoSearchCode;
