import { Component, DestroyRef, inject, OnInit, output, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { InfoXQueryReq } from '../../../../core/models/guest/test3VmG';
import { InfoXS } from '../../../../core/services/guest/info/infoxS';
import { LoginS } from '../../../../core/services/common/login/loginS';
import { ToastP } from '../../../../core/providers/common/toastP';

import { Btn } from '../../../../shared/widgets/btn/btn';

@Component({
  selector: 'app-infox',
  imports: [Btn],
  templateUrl: './infox.html',
  styleUrl: './infox.css',
})
export class InfoX implements OnInit {
  //#region State
  private _dr = inject(DestroyRef);

  private _infoxS = inject(InfoXS);
  private _loginS = inject(LoginS);
  private _toastP = inject(ToastP);

  public isActive = output<string>();

  public fCnt = signal<number>(0);
  public rCnt = signal<number>(0);
  public hCnt = signal<number>(0);
  public mCnt = signal<number>(0);
  //#endregion

  //#region Lifecycle
  public ngOnInit() { this._queryInfoX(); }
  //#endregion

  //#region Method
  private _queryInfoX() {
    const args = Object.assign(new InfoXQueryReq(), { guid: this._loginS.client()!.guid });

    this._infoxS.get(args).pipe(takeUntilDestroyed(this._dr)).subscribe({
      next: (res) => {
        if (res.status) {
          this.fCnt.set(res.fCnt);
          this.rCnt.set(res.rCnt);
          this.hCnt.set(res.hCnt);
          this.mCnt.set(res.mCnt);
        }
        else {
          if (res.statusCode.startsWith('400')) { this._toastP.tWarn(res.message); }
          else { this._toastP.tErr(res.message); }
        }
      },
      error: () => { this._toastP.tErr('Network Error'); }
    });
  }

  public switch(value: string) { this.isActive.emit(value); }
  //#endregion
}
