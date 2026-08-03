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
  @Input({ required: true }) FC!: FormControl;
  @Input() type: string = 'text';
  @Input() id: string = '';
  @Input() iptClass: string = '';
  @Input() placeholder: string = '';
  //#endregion
}
