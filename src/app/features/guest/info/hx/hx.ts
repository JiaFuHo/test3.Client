import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DatePipe } from '@angular/common';

import { FavSaveReq, HxQueryReq, HxInfo } from '../../../../core/models/guest/test3VmG';
import { FavS } from '../../../../core/services/guest/info/favS';
import { HxS } from '../../../../core/services/guest/info/hxS';
import { LoginS } from '../../../../core/services/common/login/loginS';
import { ToastP } from '../../../../core/providers/common/toastP';

import { Btn } from '../../../../shared/widgets/btn/btn';
import { Pagination } from '../../../../shared/widgets/pagination/pagination';

import { ModalHx } from './modal-hx/modal-hx';

import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-hx',
  imports: [Btn, DatePipe, ModalHx, Pagination],
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

  public totalCount = signal<number>(0);
  public page = signal<number>(1);
  public size = signal<number>(5);
  public hxList = signal<HxInfo[]>([]);
  public historyId = signal<string>('');
  public score = signal<string>('');
  public feedback = signal<string>('');
  //#endregion

  //#region Lifecycle
  public ngOnInit() { this.queryHx(); }
  //#endregion

  //#region Method
  public createFav(collectionId: string) {
    const args = Object.assign(new FavSaveReq(), {
      guid: this._loginS.client()!.guid,
      collectionId: collectionId,
    });

    this._favS.post(args).pipe(takeUntilDestroyed(this._dr)).subscribe({
      next: (res) => {
        if (res.status) {
          this.queryHx();
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
      const args = Object.assign(new FavSaveReq(), {
        guid: this._loginS.client()!.guid,
        collectionId: collectionId,
      });

      this._favS.delete(args).pipe(takeUntilDestroyed(this._dr)).subscribe({
        next: (res) => {
          if (res.status) {
            this.queryHx();
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

  public queryHx() {
    const args = Object.assign(new HxQueryReq(), {
      page: this.page(),
      size: this.size(),
      guid: this._loginS.client()!.guid,
    });

    this._hxS.get(args).pipe(takeUntilDestroyed(this._dr)).subscribe({
      next: (res) => {
        if (res.status) {
          this.totalCount.set(res.totalCount);
          this.page.set(Number(args.page) || 1);
          this.size.set(Number(args.size) || 5);
          this.hxList.set(res.hxList);
        }
        else {
          if (res.statusCode.startsWith('400')) { this._toastP.tWarn(res.message); }
          else { this._toastP.tErr(res.message); }
        }
      },
      error: () => { this._toastP.tErr('Network Error'); }
    });
  }

  public flip(pageX: number) {
    this.page.set(pageX);
    this.queryHx();
  }

  public popup(historyId: string, score: string, feedback: string) {
    const tElem = document.getElementById('modal_hx');

    if (tElem) { bootstrap.Modal.getOrCreateInstance(tElem)?.show(); }

    this.historyId.set(historyId);
    this.score.set(score);
    this.feedback.set(feedback);
  }
  //#endregion
}
