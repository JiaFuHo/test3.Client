import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { RsvQueryReq, RsvInfo } from '../../../../core/models/guest/test3VmG';
import { RsvS } from '../../../../core/services/guest/info/rsvS';
import { LoginS } from '../../../../core/services/common/login/loginS';
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
  private _dr = inject(DestroyRef);

  private _rsvS = inject(RsvS);
  private _loginS = inject(LoginS);
  private _toastP = inject(ToastP);

  public rsvList = signal<RsvInfo[]>([]);
  //#endregion

  //#region Lifecycle
  public ngOnInit() {
    const args = new RsvQueryReq();

    args.guid = this._loginS.client()!.guid;

    this._rsvS.get(args).pipe(takeUntilDestroyed(this._dr)).subscribe({
      next: (res) => {
        if (res.status) { this.rsvList.set(res.rsvList); }
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
  public update() {}
  //#endregion
}
