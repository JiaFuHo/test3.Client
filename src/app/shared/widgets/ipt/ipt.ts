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
  @Input({ alias: 'controlName', required: true }) N!: FormControl;
  @Input('type') T: string = 'text';
  @Input('id') I: string = '';
  @Input('class') C: string = '';
  @Input('placeholder') P: string = '';
  //#endregion
}
