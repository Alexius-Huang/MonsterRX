const AutoSearchCode = `/* Query Elements */
const inputElement = document.getElementById('auto-search-example-input');
const cancelBtnElement = document.getElementById('auto-search-cancel-btn');

/* Create Observable Streams */
const input$ = Rx.Observable.fromEvent(inputElement, 'input');
const focus$ = Rx.Observable.fromEvent(inputElement, 'focus');
const cancel$ = Rx.Observable.fromEvent(cancelBtnElement, 'click');

/*
 *  In this example, the constant CSSColors is an array
 *  of color types.
 */
const CSSColors$ = Rx.Observable.from(CSSColors);

/* Event Subscription */
Rx.Observable
  .merge(input$, focus$)
  .debounceTime(500)
  .takeUntil(cancel$)
  .subscribe((e) => {
    let regExp = new RegExp(e.target.value);
    
    const matched = [];

    /* Take the top 10 searched result */
    CSSColors$
      .filter(data => regExp.test(data))
      .take(10)
      .subscribe(result => {
        matched.push(result);

        /* Call a custom method to update matched list */
        update(matched); 
      })
  });
`

export default AutoSearchCode;
