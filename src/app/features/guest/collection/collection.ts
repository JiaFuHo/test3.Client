import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';

import { BookInfo, CollectionQueryReq, SearchQueryReq } from '../../../core/models/guest/test3VmG';
import { ToastP } from '../../../core/providers/common/toastP';
import { CollectinS } from '../../../core/services/guest/collection/collectionS';

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
  private _collectinS = inject(CollectinS);
  private _dr = inject(DestroyRef);
  private _route = inject(ActivatedRoute);
  private _router = inject(Router);
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

      this._collectinS.exe(reqX).pipe(takeUntilDestroyed(this._dr)).subscribe({
        next: (res) => {
          if (res.status) {
            this.totalCount.set(res.totalCount);
            this.page.set(Number(reqX.page) || 1);
            this.size.set(Number(reqX.size) || 5);
            this.bookList.set(res.bookList);
            this._toastP.tInfo(res.message);
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
        error: (err) => { this._toastP.tErr('Network Error'); }
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
  //#endregion
}
