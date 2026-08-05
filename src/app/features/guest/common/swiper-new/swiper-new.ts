import { Component, ChangeDetectorRef, CUSTOM_ELEMENTS_SCHEMA as WebCmp, inject } from '@angular/core';

import { ServiceP } from '../../../../core/providers/system/serviceP';

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
  private _serviceP = inject(ServiceP);

  public bookList: any = null;
  //#endregion

  //#region Lifecycle
  public ngOnInit() {
    const args = { Mode: 'N' };

    this.bookList = null;

    this._serviceP.get<any>('/guest/home/booklist', args).subscribe({
      next: (res) => {
        if (res.status) { this.bookList = res.bookList; }

        this._cdr.detectChanges();
      }
    });
  }
  //#endregion
}
