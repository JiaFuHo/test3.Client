import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ServiceP } from '../../../providers/system/serviceP';

@Injectable({ providedIn: 'root' })
export class SeriesListS {
  //#region State
  private _serviceP = inject(ServiceP);
  //#endregion

  //#region Method
  public exe(): Observable<any> { return this._serviceP.get<any>('/guest/home/serieslist'); }
  //#endregion
}
