import { AsyncSubject, BehaviorSubject, ReplaySubject } from 'rxjs';
// Variants of subject

/*-------------------------------------------------------------------------*/
// BehaviorSubjects are useful for representing "values over time".
const subject = new BehaviorSubject(0); // 0 is the initial value

subject.subscribe({
  next: (v) => console.log(`observerA: ${v}`)
});

subject.next(1);
subject.next(2);

subject.subscribe({
  next: (v) => console.log(`observerB: ${v}`)
});

subject.next(3);

// Logs
// observerA: 0
// observerA: 1
// observerA: 2
// observerB: 2
// observerA: 3
// observerB: 3
/*-------------------------------------------------------------------------*/

// ReplaySubject: records multiple values from the Observable execution and replays them to new subscribers.

const subject2 = new ReplaySubject(3); // buffer 3 values for new subscribers
 
subject2.subscribe({
  next: (v) => console.log(`observerA: ${v}`)
});
 
subject2.next(1);
subject2.next(2);
subject2.next(3);
subject2.next(4);
 
subject2.subscribe({
  next: (v) => console.log(`observerB: ${v}`)
});
 
subject2.next(5);
 
// Logs:
// observerA: 1
// observerA: 2
// observerA: 3
// observerA: 4
// observerB: 2
// observerB: 3
// observerB: 4
// observerA: 5
// observerB: 5

// can also specify a window time in milliseconds, besides of the buffer size, to determine how old the recorded values can be.

/*-------------------------------------------------------------------------*/

// AsyncSubject

// The AsyncSubject is a variant where only the last value of the Observable execution is sent to its observers, and only when the execution completes.
// The AsyncSubject is similar to the last() operator, in that it waits for the complete notification in order to deliver a single value.

const subject = new AsyncSubject();
 
subject.subscribe({
  next: (v) => console.log(`observerA: ${v}`)
});
 
subject.next(1);
subject.next(2);
subject.next(3);
subject.next(4);
 
subject.subscribe({
  next: (v) => console.log(`observerB: ${v}`)
});
 
subject.next(5);
subject.complete();
 
// Logs:
// observerA: 5
// observerB: 5
