import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';

import { BookInfo, RsvSaveReq, SearchQueryReq } from '../../../core/models/guest/test3VmG';
import { LoginS } from '../../../core/services/common/login/loginS';
import { RsvS } from '../../../core/services/guest/info/rsvS';
import { SearchS } from '../../../core/services/guest/search/searchS';
import { ToastP } from '../../../core/providers/common/toastP';

import { Btn } from '../../../shared/widgets/btn/btn';

import { SwiperPop } from '../common/swiper-pop/swiper-pop';

@Component({
  selector: 'app-search',
  imports: [Btn, SwiperPop],
  templateUrl: './search.html',
  styleUrl: './search.css',
})
export class Search implements OnInit {
  //#region State
  private _dr = inject(DestroyRef);
  private _route = inject(ActivatedRoute);
  private _router = inject(Router);

  private _loginS = inject(LoginS);
  private _rsvS = inject(RsvS);
  private _searchS = inject(SearchS);
  private _toastP = inject(ToastP);

  public bookInfo = signal<BookInfo | null>(null);

  public isActive = signal<number>(1);
  //#endregion

  //#region Lifecycle
  public ngOnInit() {
    this._route.queryParams.pipe(takeUntilDestroyed(this._dr)).subscribe((args) => {
      if (Object.keys(args).length === 0) { return; }

      this._router.navigate(['/search'], { replaceUrl: true });

      this._searchS.get(args as SearchQueryReq).pipe(takeUntilDestroyed(this._dr)).subscribe({
        next: (res) => {
          if (res.status) {
            this.bookInfo.set(res.bookInfo);
            this._toastP.tInfo(res.message);
          }
          else {
            if (res.statusCode.startsWith('400')) {
              this.bookInfo.set(null);
              this._toastP.tWarn(res.message);
            }
            else {
              this.bookInfo.set(null);
              this._toastP.tErr(res.message);
            }
          }
        },
        error: () => { this._toastP.tErr('Network Error'); }
      });
    });
  }
  //#endregion

  //#region Method
  public createRsv(collectionId: string) {
    const args = new RsvSaveReq();

    args.guid = this._loginS.client()?.guid;
    args.collectionId = collectionId;
    args.reservationStatusId = '1';

    this._rsvS.post(args).pipe(takeUntilDestroyed(this._dr)).subscribe({
      next: (res) => {
        if (res.status) { this._toastP.tInfo(res.message); }
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
