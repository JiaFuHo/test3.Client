import { Component, DestroyRef, inject, OnInit, output, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl } from '@angular/forms';

import { InfoXQueryReq, InfoXSaveReq } from '../../../../core/models/guest/test3VmG';
import { InfoXS } from '../../../../core/services/guest/info/infoxS';
import { LoginS } from '../../../../core/services/common/login/loginS';
import { ToastP } from '../../../../core/providers/common/toastP';

import { CoreModule } from '../../../../shared/modules/core';
import { Btn } from '../../../../shared/widgets/btn/btn';
import { Ipt } from '../../../../shared/widgets/ipt/ipt';

@Component({
  selector: 'app-infox',
  imports: [CoreModule, Btn, Ipt],
  templateUrl: './infox.html',
  styleUrl: './infox.css',
})
export class InfoX implements OnInit {
  //#region State
  private _dr = inject(DestroyRef);

  private _infoxS = inject(InfoXS);
  private _toastP = inject(ToastP);

  public loginS = inject(LoginS);

  public isActive = output<string>();

  public fCnt = signal<number>(0);
  public rCnt = signal<number>(0);
  public hCnt = signal<number>(0);
  public mCnt = signal<number>(0);

  public isModified_cPwd = signal<boolean>(false);
  public isModified_cPhone = signal<boolean>(false);

  public form_cPwd = new FormControl('');
  public form_cPhone = new FormControl(this.loginS.client()!.cPhone || '');
  //#endregion

  //#region Lifecycle
  public ngOnInit() { this._queryInfoX(); }
  //#endregion

  //#region Method
  private _queryInfoX() {
    const args = Object.assign(new InfoXQueryReq(), { guid: this.loginS.client()!.guid });

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

  public updateInfoX(mode: string) {
    const args = Object.assign(new InfoXSaveReq(), {
      guid: this.loginS.client()!.guid,
      cPwd: (mode === 'cPwd') ? this.form_cPwd.value : undefined,
      cPhone: (mode === 'cPhone') ? this.form_cPhone.value : undefined,
      mode: mode,
    });

    this._infoxS.put(args).pipe(takeUntilDestroyed(this._dr)).subscribe({
      next: (res) => {
        if (res.status) {
          this._queryInfoX(); // ???
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

  public switch(value: string) { this.isActive.emit(value); }

  public switchX(mode: string) {
    if (mode === 'cPwd') {
      if (this.isModified_cPwd()) { this.isModified_cPwd.set(false); }
      else { this.isModified_cPwd.set(true); }
    }
    else {
      if (this.isModified_cPhone()) { this.isModified_cPhone.set(false); }
      else { this.isModified_cPhone.set(true); }
    }
  }
  //#endregion
}
