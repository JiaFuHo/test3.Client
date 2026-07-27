import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

import { CoreModule } from '../../module/core';

@Component({
  selector: 'app-drp',
  imports: [CoreModule],
  templateUrl: './drp.html',
  styleUrl: './drp.css',
})
export class Drp {
  //#region Input
  @Input({ alias: 'controlName', required: true }) N!: FormControl;
  @Input('options') O: any[] = [];
  @Input('class') C: string = '';
  //#endregion
}
