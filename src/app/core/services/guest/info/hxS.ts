import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { HxQueryReq, HxQueryRes, HxSaveReq, HxSaveRes } from '../../../models/guest/test3VmG';
import { ServiceP } from '../../../providers/system/serviceP';

@Injectable({ providedIn: 'root' })
export class HxS {
  //#region State
  private _serviceP = inject(ServiceP);
  //#endregion

  //#region Method
  public get(args: HxQueryReq): Observable<HxQueryRes> {
    return this._serviceP.get<HxQueryRes>('/guest/info/hx', args);
  }

  public put(args: HxSaveReq): Observable<HxSaveRes> {
    return this._serviceP.put<HxSaveRes>('/guest/info/hx', args);
  }
  //#endregion
}
