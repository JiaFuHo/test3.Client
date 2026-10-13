import { Component, input } from '@angular/core';

@Component({
  selector: 'app-modal-msg',
  imports: [],
  templateUrl: './modal-msg.html',
  styleUrl: './modal-msg.css',
})
export class ModalMsg {
  //#region State
  public msg = input<string>('');
  //#endregion
}
