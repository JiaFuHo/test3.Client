import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { HomeQueryBookReq, HomeQueryBookRes } from '../../../models/guest/test3VmG';
import { ServiceP } from '../../../providers/system/serviceP';

@Injectable({ providedIn: 'root' })
export class BookListS {
  //#region State
  private _serviceP = inject(ServiceP);
  //#endregion

  //#region Method
  public exe(args: HomeQueryBookReq): Observable<HomeQueryBookRes> {
    return this._serviceP.get<HomeQueryBookRes>('/guest/home/booklist', args);
  }
  //#endregion
}
