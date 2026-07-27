import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { CoreModule } from '../../../shared/module/core';
import { Btn } from '../../../shared/widget/btn/btn';
import { Ipt } from '../../../shared/widget/ipt/ipt';

@Component({
  selector: 'app-login',
  imports: [CoreModule, Btn, Ipt],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class LoginA {
  //#region State
  private _fb = inject(FormBuilder);

  public formLA = this._fb.nonNullable.group({
    Acc: ['', Validators.required],
    Pwd: ['', Validators.required],
  });
  //#endregion

  //#region Method
  public loginA() {
    if (this.formLA.invalid) { this.formLA.markAllAsTouched(); return; }

    const args = this.formLA.getRawValue();
  }
  //#endregion
}
