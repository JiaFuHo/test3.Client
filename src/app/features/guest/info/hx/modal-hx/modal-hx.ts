import { Component, DestroyRef, effect, inject, input, output } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder } from '@angular/forms';

import { HxSaveReq } from '../../../../../core/models/guest/test3VmG';
import { HxS } from '../../../../../core/services/guest/info/hxS';
import { LoginS } from '../../../../../core/services/common/login/loginS';
import { ToastP } from '../../../../../core/providers/common/toastP';

import { CoreModule } from '../../../../../shared/modules/core';
import { Btn } from '../../../../../shared/widgets/btn/btn';

import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-modal-hx',
  imports: [CoreModule, Btn],
  templateUrl: './modal-hx.html',
  styleUrl: './modal-hx.css',
})
export class ModalHx {
  //#region State
  private _dr = inject(DestroyRef);
  private _formBuilder = inject(FormBuilder);

  private _hxS = inject(HxS);
  private _loginS = inject(LoginS);
  private _toastP = inject(ToastP);

  public historyId = input<string>('');
  public score = input<string>('');
  public feedback = input<string>('');

  public isSaved = output<boolean>();

  public readonly starArray = [1, 2, 3, 4, 5];

  public formS = this._formBuilder.nonNullable.group({
    historyId: '',
    score: '',
    feedback: '',
  });
  //#endregion

  //#region Constructor
  constructor() {
    effect(() => {
      this.formS.patchValue({
        historyId: this.historyId(),
        score: this.score(),
        feedback: this.feedback(),
      });
    });
  }
  //#endregion

  //#region Method
  public updateHx() {
    const args = Object.assign(new HxSaveReq(), this.formS.getRawValue(), {
      guid: this._loginS.client()!.guid,
    });

    this._hxS.put(args).pipe(takeUntilDestroyed(this._dr)).subscribe({
      next: (res) => {
        if (res.status) {
          const tElem = document.getElementById('modal_hx');

          if (tElem) { bootstrap.Modal.getOrCreateInstance(tElem)?.hide(); }

          this.isSaved.emit(true);
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

  public rate(val: number) {
    this.formS.controls.score.setValue(val.toString());
  }
  //#endregion
}
