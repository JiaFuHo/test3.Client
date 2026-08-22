import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { SearchQueryReq, SearchQueryRes } from '../../../models/guest/test3VmG';
import { ServiceP } from '../../../providers/system/serviceP';

@Injectable({ providedIn: 'root' })
export class SearchS {
  //#region State
  private _serviceP = inject(ServiceP);
  //#endregion

  //#region Method
  public exe(args: SearchQueryReq): Observable<SearchQueryRes> {
    return this._serviceP.get<SearchQueryRes>('/guest/search', args);
  }
  //#endregion
}
