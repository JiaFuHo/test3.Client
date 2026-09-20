import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { RsvQueryReq, RsvQueryRes } from '../../../models/guest/test3VmG';
import { ServiceP } from '../../../providers/system/serviceP';

@Injectable({ providedIn: 'root' })
export class RsvS {
  //#region State
  private _serviceP = inject(ServiceP);
  //#endregion

  //#region Method
  public exe(args: RsvQueryReq): Observable<RsvQueryRes> {
    return this._serviceP.get<RsvQueryRes>('/guest/info/rsv', args);
  }
  //#endregion
}
