import { Component, ChangeDetectorRef, CUSTOM_ELEMENTS_SCHEMA as WebCmp, inject } from '@angular/core';

import { ServiceP } from '../../../../core/providers/system/serviceP';

import { Swiper } from '../../../../shared/modules/swiper';
import { Btn } from '../../../../shared/widgets/btn/btn';

Swiper();

@Component({
  selector: 'app-swiper-pop',
  imports: [Btn],
  templateUrl: './swiper-pop.html',
  styleUrl: './swiper-pop.css',
  schemas: [WebCmp],
})
export class SwiperPop {
  //#region State
  private _cdr = inject(ChangeDetectorRef);
  private _serviceP = inject(ServiceP);

  public bookList: any = null;
  //#endregion

  //#region Lifecycle
  public ngOnInit() {
    const args = { Mode: 'P' };

    this.bookList = null;

    this._serviceP.get<any>('/guest/home/booklist', args).subscribe({
      next: (res) => {
        if (res.status) { this.bookList = res.bookList; }

        this._cdr.detectChanges();
      }
    });
  }
  //#endregion

  //#region Method
  public query() {
    
  }
  //#endregion
}
