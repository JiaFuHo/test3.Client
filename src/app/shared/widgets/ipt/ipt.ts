import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

import { CoreModule } from '../../modules/core';

@Component({
  selector: 'app-ipt',
  imports: [CoreModule],
  templateUrl: './ipt.html',
  styleUrl: './ipt.css',
})
export class Ipt {
  //#region Input
  @Input({ required: true }) public FC!: FormControl;
  @Input() public type: string = 'text';
  @Input() public id: string = '';
  @Input() public iptClass: string = '';
  @Input() public placeholder: string = '';
  //#endregion
}
