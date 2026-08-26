import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, Validators } from '@angular/forms';

import { LoginReq } from './../../../core/models/common/loginVm';
import { ToastP } from './../../../core/providers/common/toastP';
import { LoginS } from '../../../core/services/common/login/loginS';

import { CoreModule } from '../../../shared/modules/core';
import { Btn } from '../../../shared/widgets/btn/btn';
import { Ipt } from '../../../shared/widgets/ipt/ipt';

@Component({
  selector: 'app-login',
  imports: [CoreModule, Btn, Ipt],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class LoginA {
  //#region State
  private _dr = inject(DestroyRef);
  private _formBuilder = inject(FormBuilder);
  private _loginS = inject(LoginS);
  private _toastP = inject(ToastP);

  public formLA = this._formBuilder.nonNullable.group({
    cAcc: ['', Validators.required],
    cPwd: ['', Validators.required],
    mode: 'A',
  });
  //#endregion

  //#region Method
  public loginA() {
    if (this.formLA.invalid) { this.formLA.markAllAsTouched(); return; }

    const args = this.formLA.getRawValue();

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
