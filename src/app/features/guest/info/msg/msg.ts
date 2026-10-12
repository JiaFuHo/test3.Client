import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DatePipe } from '@angular/common';

import { MsgQueryReq, MsgInfo, MsgSaveReq } from '../../../../core/models/guest/test3VmG';
import { MsgS } from '../../../../core/services/guest/info/msgS';
import { LoginS } from '../../../../core/services/common/login/loginS';
import { ToastP } from '../../../../core/providers/common/toastP';

@Component({
  selector: 'app-msg',
  imports: [DatePipe],
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
  public ngOnInit() { this._queryMsg(); }
  //#endregion

  //#region Method
  private _queryMsg () {
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

  public updateMsg(notificationId: string) {
    const args = new MsgSaveReq();

    args.notificationId = notificationId;
    args.isRead = true; // ???

    this._msgS.put(args).pipe(takeUntilDestroyed(this._dr)).subscribe({
      next: (res) => {
        if (res.status) {
          this._queryMsg();
          this._toastP.tInfo(res.message);
        }
        else {
          if (res.statusCode.startsWith('400')) { this._toastP.tWarn(res.message); }
          else { this._toastP.tErr(res.message); }
        }
      },
      error: () => { this._toastP.tErr('Network Error'); }
    });
  }
  //#endregion
}
