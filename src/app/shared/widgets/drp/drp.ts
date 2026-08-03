import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

import { CoreModule } from '../../modules/core';

@Component({
  selector: 'app-drp',
  imports: [CoreModule],
  templateUrl: './drp.html',
  styleUrl: './drp.css',
})
export class Drp {
  //#region Input
  @Input({ required: true }) FC!: FormControl;
  @Input() options: any[] = [];
  @Input() drpClass: string = '';
  //#endregion
}
