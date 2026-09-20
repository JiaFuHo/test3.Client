import { Component, inject, OnInit, signal } from '@angular/core';

import { MsgQueryReq } from '../../../../core/models/guest/test3VmG';
import { MsgS } from '../../../../core/services/guest/info/msgS';
import { ToastP } from '../../../../core/providers/common/toastP';

import { Btn } from '../../../../shared/widgets/btn/btn';

@Component({
  selector: 'app-msg',
  imports: [],
  templateUrl: './msg.html',
  styleUrl: './msg.css',
})
export class Msg implements OnInit {
  //#region State
  private _msgS = inject(MsgS);
  //#endregion

  //#region Lifecycle
  public ngOnInit() {}
  //#endregion

  //#region Method

  //#endregion
}
