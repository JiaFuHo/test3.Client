import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, Validators } from '@angular/forms';

import { LoginReq } from './../../../core/models/common/loginVm';
import { ToastP } from './../../../core/providers/common/toastP';
import { LoginS } from '../../../core/services/common/login/loginS';

import { CoreModule } from '../../../shared/modules/core';
import { Btn } from '../../../shared/widgets/btn/btn';
import { Ipt } from '../../../shared/widgets/ipt/ipt';

import { Tree } from '../common/tree/tree';

@Component({
  selector: 'app-login',
  imports: [CoreModule, Btn, Ipt, Tree],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class LoginG {
  //#region State
  private _dr = inject(DestroyRef);
  private _formBuilder = inject(FormBuilder);
  private _loginS = inject(LoginS);
  private _toastP = inject(ToastP);

  public formLG = this._formBuilder.nonNullable.group({
    cAcc: ['', Validators.required],
    cPwd: ['', Validators.required],
    mode: 'G',
  });
  //#endregion

  //#region Method
  public loginG() {
    if (this.formLG.invalid) { this.formLG.markAllAsTouched(); return; }

    const args = this.formLG.getRawValue();

    this._loginS.exe(args as LoginReq).pipe(takeUntilDestroyed(this._dr)).subscribe({
      next: (res) => {
        if (res.status) {
          this._loginS.client.set(res);
          this._toastP.tInfo(res.message);

          localStorage.setItem('client', JSON.stringify(res));
        }
        else {
          if (res.statusCode.startsWith('400')) { this._toastP.tWarn(res.message); }
          else { this._toastP.tErr(res.message); }
        }
      },
      error: (err) => { this._toastP.tErr('Network Error'); }
    })
  }
  //#endregion
}
