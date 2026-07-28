import { Component, signal } from '@angular/core';

import { CoreModule } from './shared/modules/core';

@Component({
  selector: 'app-root',
  imports: [CoreModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('test3');
}
