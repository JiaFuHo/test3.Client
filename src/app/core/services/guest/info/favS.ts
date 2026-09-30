import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { FavQueryReq, FavQueryRes } from '../../../models/guest/test3VmG';
import { FavSaveReq, FavSaveRes } from '../../../models/guest/test3VmG';
import { ServiceP } from '../../../providers/system/serviceP';

@Injectable({ providedIn: 'root' })
export class FavS {
  //#region State
  private _serviceP = inject(ServiceP);
  //#endregion

  //#region Method
  public get(args: FavQueryReq): Observable<FavQueryRes> {
    return this._serviceP.get<FavQueryRes>('/guest/info/fav', args);
  }

  public post(args: FavSaveReq): Observable<FavSaveRes> {
    return this._serviceP.post<FavSaveRes>('/guest/info/fav', args);
  }

  public delete(args: FavSaveReq): Observable<FavSaveRes> {
    return this._serviceP.delete<FavSaveRes>('/guest/info/fav', args);
  }
  //#endregion
}
