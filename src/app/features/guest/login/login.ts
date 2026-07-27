import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { CoreModule } from '../../../shared/module/core';
import { Btn } from '../../../shared/widget/btn/btn';
import { Ipt } from '../../../shared/widget/ipt/ipt';

import { Tree } from '../common/tree/tree';

@Component({
  selector: 'app-login',
  imports: [CoreModule, Btn, Ipt, Tree],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class LoginG {
  //#region State
  private _fb = inject(FormBuilder);

  public formLG = this._fb.nonNullable.group({
    Acc: ['', Validators.required],
    Pwd: ['', Validators.required],
  });
  //#endregion

  //#region Method
  public loginG() {
    if (this.formLG.invalid) { this.formLG.markAllAsTouched(); return; }

    const args = this.formLG.getRawValue();
  }
  //#endregion
}
