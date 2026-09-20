import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { MsgQueryReq, MsgQueryRes } from '../../../models/guest/test3VmG';
import { ServiceP } from '../../../providers/system/serviceP';

@Injectable({ providedIn: 'root' })
export class MsgS {
  //#region State
  private _serviceP = inject(ServiceP);
  //#endregion

  //#region Method
  public exe(args: MsgQueryReq): Observable<MsgQueryRes> {
    return this._serviceP.get<MsgQueryRes>('/guest/info/msg', args);
  }
  //#endregion
}
