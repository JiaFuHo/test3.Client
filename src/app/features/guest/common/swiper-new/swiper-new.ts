import { Component, ChangeDetectorRef, CUSTOM_ELEMENTS_SCHEMA as WebCmp, inject } from '@angular/core';
import { Router } from '@angular/router';

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
export class SwiperNew {
  //#region State
  private _booklistS = inject(BookListS);
  private _cdr = inject(ChangeDetectorRef);
  private _router = inject(Router);

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

  //#region Method
  public query(ISBN: string) {
    const args = { Type1: 'isbn', Info: ISBN };

    this._router.navigate(['/search'], { queryParams: args });
  }
  //#endregion
}
