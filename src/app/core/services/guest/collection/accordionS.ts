import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { AccordionQueryRes } from '../../../models/guest/test3VmG';
import { ServiceP } from '../../../providers/system/serviceP';

@Injectable({ providedIn: 'root' })
export class AccordionS {
  //#region State
  private _serviceP = inject(ServiceP);
  //#endregion

  //#region Method
  public exe(): Observable<AccordionQueryRes> {
    return this._serviceP.get<AccordionQueryRes>('/guest/collection/accordion');
  }
  //#endregion
}
