import { interval } from 'rxjs';

//Subscription:  an object that represents a disposable resource, usually the execution of an Observable.  
// essentially just has an unsubscribe() function to release resources or cancel Observable executions.

const observable1 = interval(400);
const observable2 = interval(300);
 
const subscription = observable1.subscribe(x => console.log('first: ' + x));
const childSubscription = observable2.subscribe(x => console.log('second: ' + x));
 
subscription.add(childSubscription);
 
setTimeout(() => {
  // Unsubscribes BOTH subscription and childSubscription
  subscription.unsubscribe();
}, 1000);