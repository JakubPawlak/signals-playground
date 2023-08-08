# Signals

This project is generated for Signals experiments.

Checkout between branches to see different starting points for tasks.

## Basic example
Checkout to `basic-example` branch.

1. Change the variable to signal and update the HTML to make the example working.

## Zone-less
Checkout to `zoneless` branch.

This branch have the zone.js disabled entirely.

> Check main.ts to find out how to disable zone.js

1. Make the example work. What is missing?
2. Change the loading variable to signal. Make the example work.
3. Try to achieve changes with effect()

## computed-mutate-update
Checkout to `computed-mutate-update` branch.

Change the items service to use signals. 
Component contains derived state - `loaded` variable. Update this variable's value based on state from service. 

Signals must be called in template
### additional
- how to make use of conditional computed signal
  - based on condition, the source signal will be updated or not. the condition could be another signal. watch on condition. The computed value will be recalculated only on condition change.
- log display data changes or keep data in sync with local storage - effects
  - side effect triggered on change of the signal, executed async, keeps track of any signal source
  - effects are cleaned up automatically on destroy of the host
  - it returns EffectRef but it will require manual destroy call

```typescript
this.items  = this.itemsService.list() // this might not work

<li *ngFor="let item of items; let i = index" (click)="mutateEl(i)">
```

- untilChanged - signal(['val'], equal: () => {}) - function for equality changes. It will prevent from unnecessary change detection if there is no change
- untrack - in effect we can log/use multiple signals, but keep tracking changes from the chosen ones.
  - counter and currentUser, want to log effect only when currentUser changed and not the counter
- onCleanup effect - clean a long-running task on the next occurrence of a given effect
