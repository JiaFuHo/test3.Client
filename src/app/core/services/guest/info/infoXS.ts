import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { InfoQueryReq, InfoQueryRes } from '../../../models/guest/test3VmG';
import { ServiceP } from '../../../providers/system/serviceP';

@Injectable({ providedIn: 'root' })
export class InfoXS {
  //#region State
  private _serviceP = inject(ServiceP);
  //#endregion

  //#region Method
  public exe(args: InfoQueryReq): Observable<InfoQueryRes> {
    return this._serviceP.get<InfoQueryRes>('/guest/info', args);
  }
  //#endregion
}
