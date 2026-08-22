import { Component, ChangeDetectorRef, CUSTOM_ELEMENTS_SCHEMA as WebCmp, inject, OnInit } from '@angular/core';
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
  private _cdr = inject(ChangeDetectorRef);
  private _router = inject(Router);

  public bookList: BookInfo[] = [];
  //#endregion

  //#region Lifecycle
  public ngOnInit() {
    const args: HomeQueryBookReq = { mode: 'N' };

    this.bookList = [];

    this._booklistS.exe(args).subscribe({
      next: (res) => {
        if (res.status) { this.bookList = res.bookList; }

        this._cdr.detectChanges();
      }
    });
  }
  //#endregion

  //#region Method
  public query(isbn: string) {
    const args: SearchQueryReq = { type1: 'isbn', info: isbn };

    this._router.navigate(['/search'], { queryParams: args });
  }
  //#endregion
}
