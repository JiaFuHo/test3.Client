import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';

import { BookInfo, CollectionQueryReq, RsvSaveReq, SearchQueryReq } from '../../../core/models/guest/test3VmG';
import { CollectionS } from '../../../core/services/guest/collection/collectionS';
import { RsvS } from '../../../core/services/guest/info/rsvS';
import { ToastP } from '../../../core/providers/common/toastP';

import { Btn } from '../../../shared/widgets/btn/btn';

import { Accordion } from './accordion/accordion';
import { Pagination } from './pagination/pagination';

@Component({
  selector: 'app-collection',
  imports: [Accordion, Btn, Pagination],
  templateUrl: './collection.html',
  styleUrl: './collection.css',
})
export class Collection implements OnInit {
  //#region State
  private _dr = inject(DestroyRef);
  private _route = inject(ActivatedRoute);
  private _router = inject(Router);

  private _collectionS = inject(CollectionS);
  private _rsvS = inject(RsvS);
  private _toastP = inject(ToastP);

  public totalCount = signal<number>(0);
  public page = signal<number>(1);
  public size = signal<number>(5);
  public bookList = signal<BookInfo[]>([]);
  //#endregion

  //#region Lifecycle
  public ngOnInit() {
    this._route.queryParams.pipe(takeUntilDestroyed(this._dr)).subscribe((args) => {
      const req = new CollectionQueryReq();

      Object.assign(req, args);

      const reqX = JSON.parse(JSON.stringify(req));

      this._collectionS.get(reqX).pipe(takeUntilDestroyed(this._dr)).subscribe({
        next: (res) => {
          if (res.status) {
            this.totalCount.set(res.totalCount);
            this.page.set(Number(reqX.page) || 1);
            this.size.set(Number(reqX.size) || 5);
            this.bookList.set(res.bookList);
          }
          else {
            if (res.statusCode.startsWith('400')) {
              this.bookList.set([]);
              this._toastP.tWarn(res.message);
            }
            else {
              this.bookList.set([]);
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
  public flip(pageX: number) {
    const args = this._route.snapshot.queryParams;

    this._router.navigate(['/collection'], { queryParams: { ...args, page: pageX } });
  }

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
