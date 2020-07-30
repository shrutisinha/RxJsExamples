import { Observable } from 'rxjs';

const observable2 = new Observable(function subscribe(subscriber) {
  try{
  subscriber.next(1);
  subscriber.next(2);
  subscriber.next(3);
  subscriber.complete();
  } catch (err) {
    subscriber.error(err); // delivers an error if it caught one
  }
});

subscription = observable2.subscribe(x => console.log(x));

//Observers: consumer of values delivered by an Observable. 
// They are simply a set of callbacks, one for each type of notification delivered by the Observable: next, error, and complete. 
let observer = {
  next: x => console.log('Observer got a next value: ' + x),
  error: err => console.error('Observer got an error: ' + err),
  complete: () => console.log('Observer got a complete notification'),
};

//To use the Observer, provide it to the subscribe of an Observable:
subscription = observable.subscribe(observer);
subscription.unsubscribe();