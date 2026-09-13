import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { CollectionQueryReq, CollectionQueryRes } from '../../../models/guest/test3VmG';
import { ServiceP } from '../../../providers/system/serviceP';

@Injectable({ providedIn: 'root' })
export class CollectinS {
  //#region State
  private _serviceP = inject(ServiceP);
  //#endregion

  //#region Method
  public exe(args: CollectionQueryReq): Observable<CollectionQueryRes> {
    return this._serviceP.get<CollectionQueryRes>('/guest/collection', args);
  }
  //#endregion
}
