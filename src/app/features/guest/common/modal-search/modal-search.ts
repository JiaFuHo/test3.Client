import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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
  { value: '', text: '文體 (全部)' },
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
export class ModalSearch {
  //#region State
  private _formBuilder = inject(FormBuilder);
  private _router = inject(Router);

  public mode = '';
  public type1List = Type1List;
  public langList = LangList;
  public type2List = Type2List;

  public formQ = this._formBuilder.nonNullable.group({
    Type1: ['title'],
    Info: ['', Validators.required],
    SYear: [''],
    EYear: [''],
    Lang: [''],
    Type2: [''],
  });
  //#endregion

  //#region Method
  public query() {
    if (this.formQ.invalid) { this.formQ.markAllAsTouched(); return; }

    const args = this.formQ.getRawValue();

    const modalElem = document.getElementById('modal_search');

    if (modalElem) {
      modalElem.addEventListener('hidden.bs.modal', () => {
        this._router.navigate(['/search'], { queryParams: args });
      }, { once: true });

      bootstrap.Modal.getOrCreateInstance(modalElem)?.hide();
    }

    // this.formQ.reset();
  }

  public reset() { this.formQ.reset(); }

  public switch() {
    this.mode = (this.mode === '') ? 'A' : '';

    const Info = this.formQ.controls.Info;
    const SYear = this.formQ.controls.SYear;
    const EYear = this.formQ.controls.EYear;
    const Lang = this.formQ.controls.Lang;
    const Type2 = this.formQ.controls.Type2;

    if (this.mode === 'A') { Info.clearValidators(); }
    else {
      Info.setValidators([Validators.required]);
      [SYear, EYear, Lang, Type2].forEach(x => x.reset());
    }

    Info.updateValueAndValidity();
  }

  public sync(e: any) {
    const Info = this.formQ.controls.Info;

    Info.setValue(e.target.innerText);

    this.query();
  }
  //#endregion
}
