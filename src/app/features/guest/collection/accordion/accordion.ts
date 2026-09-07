import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { TypeInfo, LangInfo, SeriesInfo } from '../../../../core/models/common/lookupVm';
import { LookupS } from '../../../../core/services/common/lookup/lookupS';

import { Btn } from '../../../../shared/widgets/btn/btn';

@Component({
  selector: 'app-accordion',
  imports: [Btn],
  templateUrl: './accordion.html',
  styleUrl: './accordion.css',
})
export class Accordion {
  //#region State
  private _lookupS = inject(LookupS);
  private _dr = inject(DestroyRef);

  public typeList: TypeInfo[] = [];
  public publisherList: string[] = [];
  public langList: LangInfo[] = [];
  public seriesList: SeriesInfo[] = [];
  //#endregion

  //#region Lifecycle
  public ngOnInit() {
    this._lookupS.exe().pipe(takeUntilDestroyed(this._dr)).subscribe({
      next: (res) => {
        console.log(res);
        if (res.status) {
          this.typeList = res.typeList;
          this.publisherList = res.publisherList;
          this.langList = res.langList;
          this.seriesList = res.seriesList;
        }
      },
    });
  }
  //#endregion
}
