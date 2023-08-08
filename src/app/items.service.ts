import { effect, Injectable, signal } from '@angular/core';

@Injectable({providedIn: 'root'})
export class ItemsService {
  list = signal<any[] | undefined>(undefined, {equal: (a, b) => (JSON.stringify(a) === JSON.stringify(b))});

  constructor() {
    effect(() => {
      console.log(`elements in list have changed`, this.list());
    })
  }

  createListItems() {
    const el = [...Array(10).keys()];
    this.list.set(el.map((_, index) => ({label: "untouched", id: index})))
  }

  mutateElement(index: number) {
    this.list.mutate((items) => {
      if (items && items[index]) {
        items[index].label = 'Touched';
      }
    })
  }
}
