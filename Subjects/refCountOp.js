import { interval, Subject } from 'rxjs';
import { multicast, refCount } from 'rxjs/operators';

// Reference counting
// refCount makes the multicasted Observable automatically start executing when the first subscriber arrives, and stop executing when the last subscriber leaves.
// refCount() method only exists on ConnectableObservable, and it returns an Observable, not another ConnectableObservable.

//no need of using connect and unsubscribing connect observer manually

const source = interval(500);
const subject = new Subject();
const refCounted = source.pipe(multicast(subject), refCount());
let subscription1, subscription2;

// This calls `connect()`, because
// it is the first subscriber to `refCounted`
console.log('observerA subscribed');
subscription1 = refCounted.subscribe({
  next: (v) => console.log(`observerA: ${v}`)
});

setTimeout(() => {
  console.log('observerB subscribed');
  subscription2 = refCounted.subscribe({
    next: (v) => console.log(`observerB: ${v}`)
  });
}, 600);

setTimeout(() => {
  console.log('observerA unsubscribed');
  subscription1.unsubscribe();
}, 1200);

// This is when the shared Observable execution will stop, because
// `refCounted` would have no more subscribers after this
setTimeout(() => {
  console.log('observerB unsubscribed');
  subscription2.unsubscribe();
}, 2000);

// Logs
// observerA subscribed
// observerA: 0
// observerB subscribed
// observerA: 1
// observerB: 1
// observerA unsubscribed
// observerB: 2
// observerB unsubscribed