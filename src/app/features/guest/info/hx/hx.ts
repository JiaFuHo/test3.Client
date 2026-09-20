import { Component, inject, OnInit, signal } from '@angular/core';

import { HxQueryReq } from '../../../../core/models/guest/test3VmG';
import { HxS } from '../../../../core/services/guest/info/hxS';
import { ToastP } from '../../../../core/providers/common/toastP';

import { Btn } from '../../../../shared/widgets/btn/btn';

@Component({
  selector: 'app-hx',
  imports: [],
  templateUrl: './hx.html',
  styleUrl: './hx.css',
})
export class Hx implements OnInit {
  //#region State
  private _hxS = inject(HxS);
  //#endregion

  //#region Lifecycle
  public ngOnInit() {}
  //#endregion

  //#region Method

  //#endregion
}
