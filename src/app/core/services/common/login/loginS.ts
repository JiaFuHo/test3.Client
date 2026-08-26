import { Injectable, inject, signal } from '@angular/core';
import { Observable } from 'rxjs';

import { LoginReq, LoginRes } from './../../../models/common/loginVm';
import { ServiceP } from '../../../providers/system/serviceP';

@Injectable({ providedIn: 'root' })
export class LoginS {
  //#region State
  private _serviceP = inject(ServiceP);

  public client = signal<LoginRes | null>(this._cache());
  //#endregion

  //#region Method
  private _cache(): LoginRes | null {
    const client = localStorage.getItem('client');

    if (client) { return JSON.parse(client); }
    else { return null; }
  }

  public exe(args: LoginReq): Observable<LoginRes> {
    const C = (args.mode === 'G') ? 'guest' : 'admin';

    return this._serviceP.post<LoginRes>(`/${C}/login`, args);
  }
  //#endregion
}
