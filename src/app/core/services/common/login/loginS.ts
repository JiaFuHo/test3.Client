import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { LoginReq, LoginRes } from './../../../models/common/loginVm';
import { ServiceP } from '../../../providers/system/serviceP';

@Injectable({ providedIn: 'root' })
export class LoginS {
  //#region State
  private _serviceP = inject(ServiceP);
  //#endregion

  //#region Method
  public exe(args: LoginReq): Observable<LoginRes> {
    const C = (args.mode === 'G') ? 'guest' : 'admin';

    return this._serviceP.post<LoginRes>(`/${C}/login`, args);
  }
  //#endregion
}
