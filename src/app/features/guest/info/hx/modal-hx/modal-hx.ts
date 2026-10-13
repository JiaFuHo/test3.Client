import { Component, DestroyRef, inject, input, output } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { HxSaveReq } from '../../../../../core/models/guest/test3VmG';
import { HxS } from '../../../../../core/services/guest/info/hxS';
import { LoginS } from '../../../../../core/services/common/login/loginS';
import { ToastP } from '../../../../../core/providers/common/toastP';

import { Btn } from '../../../../../shared/widgets/btn/btn';

import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-modal-hx',
  imports: [Btn],
  templateUrl: './modal-hx.html',
  styleUrl: './modal-hx.css',
})
export class ModalHx {
  //#region State
  private _dr = inject(DestroyRef);

  private _hxS = inject(HxS);
  private _loginS = inject(LoginS);
  private _toastP = inject(ToastP);

  public historyId = input<string>('');
  public score = input<string>('');
  public feedback = input<string>('');

  public isSaved = output<boolean>();
  //#endregion

  //#region Method
  public updateHx(historyId: string, score: string, feedback: string) {
    const args = new HxSaveReq();

    args.guid = this._loginS.client()!.guid;
    args.historyId = historyId;
    args.score = score;
    args.feedback = feedback;

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
  //#endregion
}
