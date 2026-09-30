import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { HxQueryReq, HxInfo } from '../../../../core/models/guest/test3VmG';
import { HxS } from '../../../../core/services/guest/info/hxS';
import { LoginS } from '../../../../core/services/common/login/loginS';
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
  private _dr = inject(DestroyRef);

  private _hxS = inject(HxS);
  private _loginS = inject(LoginS);
  private _toastP = inject(ToastP);

  public hxList = signal<HxInfo[]>([]);
  //#endregion

  //#region Lifecycle
  public ngOnInit() {
    const args = new HxQueryReq();

    args.guid = this._loginS.client()!.guid;

    this._hxS.get(args).pipe(takeUntilDestroyed(this._dr)).subscribe({
      next: (res) => {
        if (res.status) { this.hxList.set(res.hxList); }
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
