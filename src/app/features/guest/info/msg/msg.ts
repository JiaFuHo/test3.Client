import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { MsgQueryReq, MsgInfo } from '../../../../core/models/guest/test3VmG';
import { MsgS } from '../../../../core/services/guest/info/msgS';
import { LoginS } from '../../../../core/services/common/login/loginS';
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
  private _dr = inject(DestroyRef);

  private _msgS = inject(MsgS);
  private _loginS = inject(LoginS);
  private _toastP = inject(ToastP);

  public msgList = signal<MsgInfo[]>([]);
  //#endregion

  //#region Lifecycle
  public ngOnInit() {
    const args = new MsgQueryReq();

    args.guid = this._loginS.client()!.guid;

    this._msgS.get(args).pipe(takeUntilDestroyed(this._dr)).subscribe({
      next: (res) => {
        if (res.status) { this.msgList.set(res.msgList); }
        else {
          if (res.statusCode.startsWith('400')) { this._toastP.tWarn(res.message); }
          else { this._toastP.tErr(res.message); }
        }
      },
      error: () => { this._toastP.tErr('Network Error'); }
    });
  }
  //#endregion

  //#region Method
  public create() {}

  public update() {}
  //#endregion
}
