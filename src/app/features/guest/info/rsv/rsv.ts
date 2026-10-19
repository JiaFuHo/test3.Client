import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DatePipe } from '@angular/common';

import { RsvQueryReq, RsvInfo, RsvSaveReq } from '../../../../core/models/guest/test3VmG';
import { RsvS } from '../../../../core/services/guest/info/rsvS';
import { LoginS } from '../../../../core/services/common/login/loginS';
import { ToastP } from '../../../../core/providers/common/toastP';

import { Btn } from '../../../../shared/widgets/btn/btn';
import { Page } from '../../../../shared/widgets/page_v2/page';

@Component({
  selector: 'app-rsv',
  imports: [Btn, DatePipe, Page],
  templateUrl: './rsv.html',
  styleUrl: './rsv.css',
})
export class Rsv implements OnInit {
  //#region State
  private _dr = inject(DestroyRef);

  private _rsvS = inject(RsvS);
  private _loginS = inject(LoginS);
  private _toastP = inject(ToastP);

  public totalCount = signal<number>(0);
  public page = signal<number>(1);
  public size = signal<number>(5);
  public rsvList = signal<RsvInfo[]>([]);
  //#endregion

  //#region Lifecycle
  public ngOnInit() { this._queryRsv(); }
  //#endregion

  //#region Method
  private _queryRsv() {
    const args = Object.assign(new RsvQueryReq(), {
      page: this.page(),
      size: this.size(),
      guid: this._loginS.client()!.guid,
    });

    this._rsvS.get(args).pipe(takeUntilDestroyed(this._dr)).subscribe({
      next: (res) => {
        if (res.status) {
          this.totalCount.set(res.totalCount);
          this.page.set(Number(args.page) || 1);
          this.size.set(Number(args.size) || 5);
          this.rsvList.set(res.rsvList);
        }
        else {
          if (res.statusCode.startsWith('400')) { this._toastP.tWarn(res.message); }
          else { this._toastP.tErr(res.message); }
        }
      },
      error: () => { this._toastP.tErr('Network Error'); }
    });
  }

  public createRsv(collectionId: string) {
    const args = Object.assign(new RsvSaveReq(), {
      guid: this._loginS.client()?.guid,
      collectionId: collectionId,
      reservationStatusId: '1',
    });

    this._rsvS.post(args).pipe(takeUntilDestroyed(this._dr)).subscribe({
      next: (res) => {
        if (res.status) {
          this._queryRsv();
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

  public updateRsv(collectionId: string) {
    if (confirm("確定取消?")) {
      const args = Object.assign(new RsvSaveReq(), {
        guid: this._loginS.client()?.guid,
        collectionId: collectionId,
        reservationStatusId: '2',
      });

      this._rsvS.put(args).pipe(takeUntilDestroyed(this._dr)).subscribe({
        next: (res) => {
          if (res.status) {
            this._queryRsv();
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

  public flip_v1(pageX: number) {
    this.page.set(pageX);
    this._queryRsv();
  }

  public flip_v2() { this._queryRsv(); }
  //#endregion
}
