import { Component, inject, OnInit, signal } from '@angular/core';

import { RsvQueryReq } from '../../../../core/models/guest/test3VmG';
import { RsvS } from '../../../../core/services/guest/info/rsvS';
import { ToastP } from '../../../../core/providers/common/toastP';

import { Btn } from '../../../../shared/widgets/btn/btn';

@Component({
  selector: 'app-rsv',
  imports: [],
  templateUrl: './rsv.html',
  styleUrl: './rsv.css',
})
export class Rsv implements OnInit {
  //#region State
  private _rsvS = inject(RsvS);
  //#endregion

  //#region Lifecycle
  public ngOnInit() {}
  //#endregion

  //#region Method

  //#endregion
}
