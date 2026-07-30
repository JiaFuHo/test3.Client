import { Component, signal } from '@angular/core';

import { CoreModule } from './shared/modules/core';
import { Toast } from './shared/widgets/toast/toast';

@Component({
  selector: 'app-root',
  imports: [Toast, CoreModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('test3');
}
