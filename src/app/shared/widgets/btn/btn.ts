import { Component, Input } from '@angular/core';

import { CoreModule } from '../../modules/core';

@Component({
  selector: 'app-btn',
  imports: [CoreModule],
  templateUrl: './btn.html',
  styleUrl: './btn.css',
})
export class Btn {
  //#region Input
  @Input('type') T: string = 'button';
  @Input('id') I: string = '';
  @Input('class') C: string = '';
  @Input('disabled') D: boolean = false;
  //#endregion
}
