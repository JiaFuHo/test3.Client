import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DatePipe } from '@angular/common';

import { MsgQueryReq, MsgInfo, MsgSaveReq } from '../../../../core/models/guest/test3VmG';
import { MsgS } from '../../../../core/services/guest/info/msgS';
import { LoginS } from '../../../../core/services/common/login/loginS';
import { ToastP } from '../../../../core/providers/common/toastP';

import { ModalMsg } from './modal-msg/modal-msg';

import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-msg',
  imports: [DatePipe, ModalMsg],
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
  public msg = signal<string>('');
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

  private _updateMsg(notificationId: string) {
    const args = new MsgSaveReq();

    args.guid = this._loginS.client()?.guid;
    args.notificationId = notificationId;
    args.isRead = true;

    this._msgS.put(args).pipe(takeUntilDestroyed(this._dr)).subscribe({
      next: (res) => {
        if (res.status) { this._queryMsg(); }
        else {
          if (res.statusCode.startsWith('400')) { this._toastP.tWarn(res.message); }
          else { this._toastP.tErr(res.message); }
        }
      },
      error: () => { this._toastP.tErr('Network Error'); }
    });
  }

  public popup(notificationId: string, message: string) {
    const tElem = document.getElementById('modal_msg');

    if (tElem) { bootstrap.Modal.getOrCreateInstance(tElem)?.show(); }

    this.msg.set(message);
    this._updateMsg(notificationId);
  }
  //#endregion
}
