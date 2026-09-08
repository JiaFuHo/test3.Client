import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { SearchQueryReq } from '../../../../core/models/guest/test3VmG';
import { SeriesInfo } from '../../../../core/models/common/lookupVm';
import { LookupS } from '../../../../core/services/common/lookup/lookupS';

import { CoreModule } from '../../../../shared/modules/core';
import { Btn } from '../../../../shared/widgets/btn/btn';
import { Drp } from '../../../../shared/widgets/drp/drp';
import { Ipt } from '../../../../shared/widgets/ipt/ipt';

import * as bootstrap from 'bootstrap';

interface Opt {
  value: string;
  text: string;
}

const KindList: Opt[] = [
  { value: 'title', text: '書名' },
  { value: 'author', text: '作者' },
  { value: 'publisher', text: '出版社' },
  { value: 'isbn', text: 'ISBN' },
];
const TypeList: Opt[] = [{ value: '', text: '類型 (全部)' }];
const LangList: Opt[] = [{ value: '', text: '語言 (全部)' }];

@Component({
  selector: 'app-modal-search',
  imports: [CoreModule, Btn, Drp, Ipt],
  templateUrl: './modal-search.html',
  styleUrl: './modal-search.css',
})
export class ModalSearch implements OnInit {
  //#region State
  private _dr = inject(DestroyRef);
  private _formBuilder = inject(FormBuilder);
  private _lookupS = inject(LookupS);
  private _router = inject(Router);

  public mode = '';
  public kindList = signal<Opt[]>(KindList);
  public typeList = signal<Opt[]>(TypeList);
  public langList = signal<Opt[]>(LangList);
  public seriesList = signal<SeriesInfo[]>([]);

  public formQ = this._formBuilder.nonNullable.group({
    kind: 'title',
    info: ['', Validators.required],
    typeId: '',
    langId: '',
    sYear: '',
    eYear: '',
  });
  //#endregion

  //#region Lifecycle
  public ngOnInit() {
    this._lookupS.exe().pipe(takeUntilDestroyed(this._dr)).subscribe({
      next: (res) => {
        if (res.status) {
          const TypeListX = res.typeList.map(x => ({ value: x.typeId.toString(), text: x.type }));
          const LangListX = res.langList.map(x => ({ value: x.langId.toString(), text: x.lang }));

          this.typeList.set([...TypeList, ...TypeListX]);
          this.langList.set([...LangList, ...LangListX]);
          this.seriesList.set(res.seriesList.slice(0, 3));
        }
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
    const langId = this.formQ.controls.langId;
    const typeId = this.formQ.controls.typeId;

    if (this.mode === 'A') { info.clearValidators(); }
    else {
      info.setValidators([Validators.required]);
      [sYear, eYear, langId, typeId].forEach(x => x.reset());
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
