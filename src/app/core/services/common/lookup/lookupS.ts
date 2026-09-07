import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { LookupRes } from '../../../models/common/lookupVm';
import { ServiceP } from '../../../providers/system/serviceP';

@Injectable({ providedIn: 'root' })
export class LookupS {
  //#region State
  private _serviceP = inject(ServiceP);
  //#endregion

  //#region Method
  public exe(): Observable<LookupRes> {
    return this._serviceP.get<LookupRes>('/lookup');
  }
  //#endregion
}
