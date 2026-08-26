import { Component, ChangeDetectorRef, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { SearchQueryReq } from '../../../../core/models/guest/test3VmG';
import { SeriesListS } from '../../../../core/services/guest/home/serieslistS';

import { CoreModule } from '../../../../shared/modules/core';
import { Btn } from '../../../../shared/widgets/btn/btn';
import { Drp } from '../../../../shared/widgets/drp/drp';
import { Ipt } from '../../../../shared/widgets/ipt/ipt';

import * as bootstrap from 'bootstrap';

interface Opt {
  value: string;
  text: string;
}

const Type1List: Opt[] = [
  { value: 'title', text: '書名' },
  { value: 'author', text: '作者' },
  { value: 'publisher', text: '出版社' },
  { value: 'isbn', text: 'ISBN' },
];

const LangList: Opt[] = [
  { value: '', text: '語言 (全部)' },
  { value: '1', text: 'English' },
  { value: '2', text: 'le français' },
  { value: '3', text: '中文' },
  { value: '4', text: '日本語' },
  { value: '5', text: '한국어' },
];

const Type2List: Opt[] = [
  { value: '', text: '類型 (全部)' },
  { value: '1', text: '小說' },
  { value: '2', text: '兒童讀物' },
  { value: '3', text: '青少年讀物' },
  { value: '4', text: '散文' },
  { value: '5', text: '傳記' },
  { value: '6', text: '詩集' },
  { value: '7', text: '漫畫' },
];

@Component({
  selector: 'app-modal-search',
  imports: [CoreModule, Btn, Drp, Ipt],
  templateUrl: './modal-search.html',
  styleUrl: './modal-search.css',
})
export class ModalSearch implements OnInit {
  //#region State
  private _cdr = inject(ChangeDetectorRef);
  private _dr = inject(DestroyRef);
  private _formBuilder = inject(FormBuilder);
  private _router = inject(Router);
  private _serieslistS = inject(SeriesListS);

  public mode = '';
  public type1List = Type1List;
  public langList = LangList;
  public type2List = Type2List;
  public seriesList: string[] = [];

  public formQ = this._formBuilder.nonNullable.group({
    type1: ['title'],
    info: ['', Validators.required],
    sYear: [''],
    eYear: [''],
    lang: [''],
    type2: [''],
  });
  //#endregion

  //#region Lifecycle
  public ngOnInit() {
    this.seriesList = [];

    this._serieslistS.exe().pipe(takeUntilDestroyed(this._dr)).subscribe({
      next: (res) => {
        if (res.status) { this.seriesList = res.seriesList; }

        this._cdr.detectChanges();
      }
    });
  }
  //#endregion

  //#region Method
  public query() {
    if (this.formQ.invalid) { this.formQ.markAllAsTouched(); return; }

    const args: SearchQueryReq = this.formQ.getRawValue();

    const tElem = document.getElementById('modal_search');

    if (tElem) {
      tElem.addEventListener('hidden.bs.modal', () => {
        this._router.navigate(['/search'], { queryParams: args });
      }, { once: true });

      bootstrap.Modal.getOrCreateInstance(tElem)?.hide();
    }

    // this.formQ.reset();
  }

  public reset() { this.formQ.reset(); }

  public switch() {
    this.mode = (this.mode === '') ? 'A' : '';

    const info = this.formQ.controls.info;
    const sYear = this.formQ.controls.sYear;
    const eYear = this.formQ.controls.eYear;
    const lang = this.formQ.controls.lang;
    const type2 = this.formQ.controls.type2;

    if (this.mode === 'A') { info.clearValidators(); }
    else {
      info.setValidators([Validators.required]);
      [sYear, eYear, lang, type2].forEach(x => x.reset());
    }

    info.updateValueAndValidity();
  }

  public sync(e: any) {
    const info = this.formQ.controls.info;

    info.setValue(e.target.innerText);

    this.query();
  }
  //#endregion
}
