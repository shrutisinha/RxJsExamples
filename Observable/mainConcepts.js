import { Observable } from 'rxjs';

//Creating Observables
//emits 'hi' every second to subscriber
const observable = new Observable(function subscribe(subscriber) {
  const id = setInterval(() => {
    subscriber.next('hi')
  }, 1000);

  //Disposing Observable Executions: Custom unsubscribe
  // Provide a way of canceling and disposing the interval resource
  return function unsubscribe() {
    clearInterval(id);
  };
});

//Subscribing to Observables
//Note: observable.subscribe different from function subscribe defined above
//Subscribe calls not shared among multiple observers of same Observable
//the parameter is the subscriber callback

let subscription = observable.subscribe(x => console.log(x));

subscription.unsubscribe();

//Executing Observables
//next/error/complete notification next*(execution|complete)?
//In an Observable Execution, zero to infinite Next notifications may be delivered. If either an Error or Complete notification is delivered, then nothing else can be delivered afterwards
const observable2 = new Observable(function subscribe(subscriber) {
  try{
  subscriber.next(1);
  subscriber.next(2);
  subscriber.next(3);
  subscriber.complete();
  subscriber.next(4); // Is not delivered because it would violate the contract
  } catch (err) {
    subscriber.error(err); // delivers an error if it caught one
  }
});

// When observable.subscribe is called, the Observer gets attached to the newly created Observable execution. This call also returns an object, the Subscription:
subscription = observable2.subscribe(x => console.log(x));

//Disposing Observable Executions: unsubscribe API
//As Observable Executions may be infinite, Observer might want to abort execution in finite time
subscription.unsubscribe();

