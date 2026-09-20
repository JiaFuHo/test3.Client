import { Component, inject, OnInit, signal } from '@angular/core';

import { InfoQueryReq } from '../../../../core/models/guest/test3VmG';
import { InfoXS } from '../../../../core/services/guest/info/infoXS';
import { ToastP } from '../../../../core/providers/common/toastP';

import { Btn } from '../../../../shared/widgets/btn/btn';

@Component({
  selector: 'app-infoX',
  imports: [],
  templateUrl: './infoX.html',
  styleUrl: './infoX.css',
})
export class InfoX implements OnInit {
  //#region State
  private _infoXS = inject(InfoXS);
  //#endregion

  //#region Lifecycle
  public ngOnInit() {}
  //#endregion

  //#region Method

  //#endregion
}
