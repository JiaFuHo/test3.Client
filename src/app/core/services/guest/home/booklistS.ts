import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ServiceP } from '../../../providers/system/serviceP';

@Injectable({ providedIn: 'root' })
export class BookListS {
  //#region State
  private _serviceP = inject(ServiceP);
  //#endregion

  //#region Method
  public exe(args: any): Observable<any> { return this._serviceP.get<any>('/guest/home/booklist', args); }
  //#endregion
}
