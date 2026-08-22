import { Component, ChangeDetectorRef, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { ToastLvl, ToastP } from '../../../core/providers/common/toastP';

import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-toast',
  imports: [],
  templateUrl: './toast.html',
  styleUrl: './toast.css',
})
export class Toast implements OnInit {
  //#region State
  private _cdr = inject(ChangeDetectorRef);
  private _dr = inject(DestroyRef);
  private _toastP = inject(ToastP);

  public lvl = '';
  public msg = '';
  //#endregion

  //#region Lifecycle
  public ngOnInit() {
    this._toastP.broadcast$.pipe(takeUntilDestroyed(this._dr)).subscribe((prompt: ToastLvl) => {
      this.lvl = prompt.lvl;
      this.msg = prompt.msg;

      this._cdr.detectChanges();

      const tElem = document.getElementById('toast');

      if (tElem) { bootstrap.Toast.getOrCreateInstance(tElem)?.show(); }
    });
  }
  //#endregion
}
