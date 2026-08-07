import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ServiceP } from '../../../providers/system/serviceP';

@Injectable({ providedIn: 'root' })
export class SearchS {
  //#region State
  private _serviceP = inject(ServiceP);
  //#endregion

  //#region Method
  public exe(args: any): Observable<any> { return this._serviceP.get<any>('/guest/search', args); }
  //#endregion
}
