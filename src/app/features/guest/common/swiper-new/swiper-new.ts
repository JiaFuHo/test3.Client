import { Component, ChangeDetectorRef, CUSTOM_ELEMENTS_SCHEMA as WebCmp, inject } from '@angular/core';

import { BookListS } from '../../../../core/services/guest/home/booklistS';

import { Swiper } from '../../../../shared/modules/swiper';

@Component({
  selector: 'app-swiper-new',
  imports: [],
  templateUrl: './swiper-new.html',
  styleUrl: './swiper-new.css',
  schemas: [WebCmp],
})
export class SwiperNew {
  //#region State
  private _cdr = inject(ChangeDetectorRef);
  private _booklistS = inject(BookListS);

  public bookList: any = null;
  //#endregion

  //#region Lifecycle
  public ngOnInit() {
    const args = { Mode: 'N' };

    this.bookList = null;

    this._booklistS.exe(args).subscribe({
      next: (res) => {
        if (res.status) { this.bookList = res.bookList; }

        this._cdr.detectChanges();
      }
    });
  }
  //#endregion
}
