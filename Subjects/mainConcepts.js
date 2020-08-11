import { Subject, from

} from 'rxjs';

// A Subject is like an Observable, but can multicast to many Observers. 
// Subjects are like EventEmitters: they maintain a registry of many listeners.
const subject = new Subject();

// From the perspective of the Observer, it cannot tell whether the Observable execution is coming from a plain unicast Observable or a Subject.
// Internally to the Subject, subscribe does not invoke a new execution that delivers values. It simply registers the given Observer in a list of Observers
subject.subscribe({
 next: (v) => console.log(`observerA: ${v}`)
});
subject.subscribe({
 next: (v) => console.log(`observerB: ${v}`)
});

/*----------------------------------------------------------------------------------*/
// Every Subject is an Observer. 
// It is an object with the methods next(v), error(e), and complete().
// To feed a new value to the Subject, just call next(theValue), and it will be multicasted to the Observers registered to listen to the Subject.
subject.next(1);
subject.next(2);

// Logs:
// observerA: 1
// observerB: 1
// observerA: 2
// observerB: 2

/*----------------------------------------------------------------------------------*/

// Since a Subject is an Observer, this also means you may provide a Subject as the argument to the subscribe of any Observable
const observable = from([1, 2, 3]);

// A multicasted Observable uses a Subject under the hood to make multiple Observers see the same Observable execution.
observable.subscribe(subject); // You can subscribe providing a Subject

// Logs:
// observerA: 1
// observerB: 1
// observerA: 2
// observerB: 2
// observerA: 3
// observerB: 3

/*----------------------------------------------------------------------------------*/
