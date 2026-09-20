import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { HxQueryReq, HxQueryRes } from '../../../models/guest/test3VmG';
import { ServiceP } from '../../../providers/system/serviceP';

@Injectable({ providedIn: 'root' })
export class HxS {
  //#region State
  private _serviceP = inject(ServiceP);
  //#endregion

  //#region Method
  public exe(args: HxQueryReq): Observable<HxQueryRes> {
    return this._serviceP.get<HxQueryRes>('/guest/info/hx', args);
  }
  //#endregion
}
