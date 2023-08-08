import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  signal,
  Signal,
  untracked,
  WritableSignal
} from '@angular/core';
import { ItemsService } from './items.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  items: WritableSignal<any[] | undefined>;
  loaded: Signal<boolean>;
  counter = signal(0);

  constructor(public itemsService: ItemsService) {
    this.items  = this.itemsService.list
    this.loaded = computed(() => !!(Array.isArray(this.items()) && this.items()?.length))
    effect(() => {
      console.log(`the list was loaded `, this.loaded(), `and the  counter is`, untracked(this.counter))
    })

    effect(() => {
      console.log(`counter changed`, this.counter());
    })

    effect((onCleanup) => {
      const counter = this.counter();

      const timer = setTimeout(() => {
        console.log(`1 second ago, the counter became ${counter}`);
      }, 1000);

      onCleanup(() => {
        clearTimeout(timer);
      });
    });
  }

  loadItems() {
    this.itemsService.createListItems();
  }

  mutateEl(index: number) {
    this.itemsService.mutateElement(index);
  }

  reset() {
    this.counter.set(0);
  }

  add() {
    this.counter.update(count => count+1);
  }

  subtract() {
    this.counter.update(count => count-1)
  }
}
