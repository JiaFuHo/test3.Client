import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { InfoXQueryReq, InfoXQueryRes } from '../../../models/guest/test3VmG';
import { ServiceP } from '../../../providers/system/serviceP';

@Injectable({ providedIn: 'root' })
export class InfoXS {
  //#region State
  private _serviceP = inject(ServiceP);
  //#endregion

  //#region Method
  public get(args: InfoXQueryReq): Observable<InfoXQueryRes> {
    return this._serviceP.get<InfoXQueryRes>('/guest/info/x', args);
  }
  //#endregion
}
