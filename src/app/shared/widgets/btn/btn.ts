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
  @Input() public type: string = 'button';
  @Input() public id: string = '';
  @Input() public btnClass: string = '';
  @Input() public disabled: boolean = false;
  //#endregion
}
