import { Component, signal } from '@angular/core';

import { CoreModule } from './shared/modules/core';
import { Toast } from './shared/widgets/toast/toast';

@Component({
  selector: 'app-root',
  imports: [CoreModule, Toast],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('test3');
}
