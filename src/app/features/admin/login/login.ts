import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

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
  private _formBuilder = inject(FormBuilder);

  public formLA = this._formBuilder.nonNullable.group({
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
