import { Component, CUSTOM_ELEMENTS_SCHEMA as WebCmp, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';

import { BookInfo, HomeQueryBookReq, RsvSaveReq, SearchQueryReq } from '../../../../core/models/guest/test3VmG';
import { BookListS } from '../../../../core/services/guest/home/booklistS';
import { RsvS } from '../../../../core/services/guest/info/rsvS';
import { ToastP } from '../../../../core/providers/common/toastP';

import { Swiper } from '../../../../shared/modules/swiper';
import { Btn } from '../../../../shared/widgets/btn/btn';

Swiper();

@Component({
  selector: 'app-swiper-new',
  imports: [Btn],
  templateUrl: './swiper-new.html',
  styleUrl: './swiper-new.css',
  schemas: [WebCmp],
})
export class SwiperNew implements OnInit {
  //#region State
  private _dr = inject(DestroyRef);
  private _router = inject(Router);

  private _booklistS = inject(BookListS);
  private _rsvS = inject(RsvS);
  private _toastP = inject(ToastP);

  public bookList = signal<BookInfo[]>([]);
  //#endregion

  //#region Lifecycle
  public ngOnInit() {
    const args: HomeQueryBookReq = { mode: 'N' };

    this._booklistS.get(args).pipe(takeUntilDestroyed(this._dr)).subscribe({
      next: (res) => { if (res.status) { this.bookList.set(res.bookList); } }
    });
  }
  //#endregion

  //#region Method
  public query(isbn: string) {
    const args: SearchQueryReq = { kind: 'isbn', info: isbn };

    this._router.navigate(['/search'], { queryParams: args });
  }

  public reserve(collectionId: string) {
    const args = new RsvSaveReq();

    args.reservationStatusId = '1';

    this._rsvS.post(args).pipe(takeUntilDestroyed(this._dr)).subscribe({
      next: (res) => {
        if (res.status) {
          // ???
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
