import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

import { CollectionQueryReq } from '../../../../core/models/guest/test3VmG';
import { TypeInfo, LangInfo, SeriesInfo } from '../../../../core/models/common/lookupVm';
import { LookupS } from '../../../../core/services/common/lookup/lookupS';

import { CoreModule } from '../../../../shared/modules/core';
import { Btn } from '../../../../shared/widgets/btn/btn';
import { Ipt } from '../../../../shared/widgets/ipt/ipt';

@Component({
  selector: 'app-accordion',
  imports: [CoreModule, Btn, Ipt],
  templateUrl: './accordion.html',
  styleUrl: './accordion.css',
})
export class Accordion implements OnInit {
  //#region State
  private _dr = inject(DestroyRef);
  private _formBuilder = inject(FormBuilder);
  private _lookupS = inject(LookupS);
  private _router = inject(Router);

  public typeList = signal<TypeInfo[]>([]);
  public publisherList = signal<string[]>([]);
  public langList = signal<LangInfo[]>([]);
  public seriesList = signal<SeriesInfo[]>([]);

  public formQ = this._formBuilder.nonNullable.group({
    typeId: '',
    publisher: '',
    langId: '',
    seriesId: '',
    sYear: '',
    eYear: '',
  });

  public isCollapseT = signal<boolean>(true);
  public isCollapseP = signal<boolean>(true);
  public isCollapseL = signal<boolean>(true);
  public isCollapseS = signal<boolean>(true);
  public isCollapseY = signal<boolean>(true);
  //#endregion

  //#region Lifecycle
  public ngOnInit() {
    this._lookupS.exe().pipe(takeUntilDestroyed(this._dr)).subscribe({
      next: (res) => {
        if (res.status) {
          this.typeList.set(res.typeList);
          this.publisherList.set(res.publisherList);
          this.langList.set(res.langList);
          this.seriesList.set(res.seriesList);
        }
      },
    });
  }
  //#endregion

  //#region Method
  public collapse(tElem: string) {
    switch (tElem) {
      case 'T': this.isCollapseT.update(x => !x); break;
      case 'P': this.isCollapseP.update(x => !x); break;
      case 'L': this.isCollapseL.update(x => !x); break;
      case 'S': this.isCollapseS.update(x => !x); break;
      case 'Y': this.isCollapseY.update(x => !x); break;
    }
  }

  public reset() { this.formQ.reset(); }

  public query() {
    const args: CollectionQueryReq = this.formQ.getRawValue();

    this._router.navigate(['/collection'], { queryParams: args });
  }
  //#endregion
}
