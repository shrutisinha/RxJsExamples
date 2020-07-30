import { Observable } from 'rxjs';

//Observables are lazy Push collections of multiple values.

//The following is an Observable that pushes the values 1, 2, 3 immediately (synchronously) when subscribed, 
// and the value 4 after one second has passed since the subscribe call, then completes:
const observable = new Observable(subscriber => {
    //can return multiple values unlike functions
subscriber.next(1);
  subscriber.next(2);
  subscriber.next(3);
    //Can return values asynchronously
setTimeout(() => {
    subscriber.next(4);
    subscriber.complete();
  }, 1000);
});

console.log('just before subscribe');

//To invoke the Observable and see these values, we need to subscribe to it:

//Observer subscribes to observable. 
//Observable executes to deliver next/error/complete notifications to Observer.
observable.subscribe({
  next(x) { console.log('got value ' + x); },
  error(err) { console.error('something wrong occurred: ' + err); },
  complete() { console.log('done'); }
});
console.log('just after subscribe');


//Subscribing to an Observable is analogous to calling a Function. 
//lazy computation and 2 seperate subscribe create 2 seperate side-effects
const foo = new Observable(subscriber => {
  console.log('Hello');
  subscriber.next(42);
});
 
foo.subscribe(x => {
  console.log(x);
});
foo.subscribe(y => {
  console.log(y);
});

//observables are synchronous
console.log('before');
foo.subscribe(x => {
  console.log(x);
});
console.log('after');