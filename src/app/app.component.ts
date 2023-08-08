import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'signals';

  loading = false;

  toggleLoading() {
    this.loading = !this.loading;
  }
}
