import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { HomeQuerySeriesRes } from '../../../models/guest/test3VmG';
import { ServiceP } from '../../../providers/system/serviceP';

@Injectable({ providedIn: 'root' })
export class SeriesListS {
  //#region State
  private _serviceP = inject(ServiceP);
  //#endregion

  //#region Method
  public exe(): Observable<HomeQuerySeriesRes> {
    return this._serviceP.get<HomeQuerySeriesRes>('/guest/home/serieslist');
  }
  //#endregion
}
