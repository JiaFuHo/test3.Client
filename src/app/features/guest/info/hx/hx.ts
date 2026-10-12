import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DatePipe } from '@angular/common';

import { FavSaveReq, HxQueryReq, HxInfo, HxSaveReq } from '../../../../core/models/guest/test3VmG';
import { FavS } from '../../../../core/services/guest/info/favS';
import { HxS } from '../../../../core/services/guest/info/hxS';
import { LoginS } from '../../../../core/services/common/login/loginS';
import { ToastP } from '../../../../core/providers/common/toastP';

import { Btn } from '../../../../shared/widgets/btn/btn';

@Component({
  selector: 'app-hx',
  imports: [Btn, DatePipe],
  templateUrl: './hx.html',
  styleUrl: './hx.css',
})
export class Hx implements OnInit {
  //#region State
  private _dr = inject(DestroyRef);

  private _favS = inject(FavS);
  private _hxS = inject(HxS);
  private _loginS = inject(LoginS);
  private _toastP = inject(ToastP);

  public hxList = signal<HxInfo[]>([]);
  //#endregion

  //#region Lifecycle
  public ngOnInit() { this._queryHx(); }
  //#endregion

  //#region Method
  public createFav(collectionId: string) {
    const args = new FavSaveReq();

    args.guid = this._loginS.client()!.guid;
    args.collectionId = collectionId;

    this._favS.post(args).pipe(takeUntilDestroyed(this._dr)).subscribe({
      next: (res) => {
        if (res.status) {
          this._queryHx();
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

  public deleteFav(collectionId: string) {
    if (confirm("確定刪除?")) {
      const args = new FavSaveReq();

      args.guid = this._loginS.client()?.guid;
      args.collectionId = collectionId;

      this._favS.delete(args).pipe(takeUntilDestroyed(this._dr)).subscribe({
        next: (res) => {
          if (res.status) {
            this._queryHx();
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
  }

  private _queryHx() {
    const args = new HxQueryReq();

    args.guid = this._loginS.client()!.guid;

    this._hxS.get(args).pipe(takeUntilDestroyed(this._dr)).subscribe({
      next: (res) => {
        if (res.status) { this.hxList.set(res.hxList); }
        else {
          if (res.statusCode.startsWith('400')) { this._toastP.tWarn(res.message); }
          else { this._toastP.tErr(res.message); }
        }
      },
      error: () => { this._toastP.tErr('Network Error'); }
    });
  }

  public updateHx(historyId: string) {
    const args = new HxSaveReq();

    args.historyId = historyId;
    // ??? score
    // ??? feedback

    this._hxS.put(args).pipe(takeUntilDestroyed(this._dr)).subscribe({
      next: (res) => {
        if (res.status) {
          this._queryHx();
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
