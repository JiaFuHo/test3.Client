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
  @Input() type: string = 'button';
  @Input() id: string = '';
  @Input() btnClass: string = '';
  @Input() disabled: boolean = false;
  //#endregion
}
