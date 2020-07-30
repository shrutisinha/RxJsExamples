import { of, interval } from 'rxjs';
import { map, first, filter } from 'rxjs/operators';

//Creation Operators 
// Can be called as standalone functions to create a new Observable with some common predefined behavior or by joining other Observables.

//interval takes a number (not an Observable) as input argument, and produces an Observable as output:
const observable = interval(1000 /* number of milliseconds */);

//of(1, 2, 3) creates an observable that will emit 1, 2, and 3, one right after another.
map(x => x * x)(of(1, 2, 3)).subscribe((v) => console.log(`value: ${v}`));

first()(of(1, 2, 3)).subscribe((v) => console.log(`value: ${v}`));

// Logs:
// value: 1


//A Pipeable Operator is a function that takes an Observable as its input and returns another Observable.
// It is a pure operation: the previous Observable stays unmodified.

// Subscribing to the output Observable will also subscribe to the input Observable.
of(10,12,13).pipe(
  map(x => x + 1),
  filter(x => x > 12)
).subscribe((v) => console.log(`value: ${v}`));
