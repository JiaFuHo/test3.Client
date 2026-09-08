import { Component, CUSTOM_ELEMENTS_SCHEMA as WebCmp, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';

import { BookInfo, HomeQueryBookReq, SearchQueryReq } from '../../../../core/models/guest/test3VmG';
import { BookListS } from '../../../../core/services/guest/home/booklistS';

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
  private _booklistS = inject(BookListS);
  private _dr = inject(DestroyRef);
  private _router = inject(Router);

  public bookList = signal<BookInfo[]>([]);
  //#endregion

  //#region Lifecycle
  public ngOnInit() {
    const args: HomeQueryBookReq = { mode: 'N' };

    this._booklistS.exe(args).pipe(takeUntilDestroyed(this._dr)).subscribe({
      next: (res) => { if (res.status) { this.bookList.set(res.bookList); } }
    });
  }
  //#endregion

  //#region Method
  public query(isbn: string) {
    const args: SearchQueryReq = { kind: 'isbn', info: isbn };

    this._router.navigate(['/search'], { queryParams: args });
  }
  //#endregion
}
