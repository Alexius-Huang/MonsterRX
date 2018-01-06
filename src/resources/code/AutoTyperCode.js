const AutoTyperCode = [
  `const words$ = Rx.Observable.from(content);
const timer$ = Rx.Observable.interval(50);

words$
  .scan((acc, char) => acc + char)
  .zip(timer$, (char, index) => char)      
  .subscribe((content) => {
    /* Call a custom update method */
    update(content);
  })`,
  `const startAnimation = () => {
  const words$ = Rx.Observable.from(content);
  const delay$ = Rx.Observable.interval(1000).take(1);
  const timer$ = Rx.Observable.interval(50);

  words$
    .scan((acc, char) => acc + char)
    .zip(timer$, (char, index) => char)
    .subscribe(
      /* Subscription */
      (content) => {
        /* Call a custom update method */
        update(content);
      },

      /* onError */
      (error) => console.log(\`Error: \${ error }\`),

      /* onComplete */
      () => {
        delay$.subscribe(() => startAnimation());
      }
    );
}

startAnimation();`
]

export default AutoTyperCode;
