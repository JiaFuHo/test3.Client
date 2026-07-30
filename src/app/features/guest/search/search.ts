import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ServiceP } from '../../../core/providers/system/serviceP';
import { ToastP } from './../../../core/providers/common/toastP';

@Component({
  selector: 'app-search',
  imports: [],
  templateUrl: './search.html',
  styleUrl: './search.css',
})
export class Search implements OnInit {
  //#region State
  private _route = inject(ActivatedRoute);
  private _serviceP = inject(ServiceP);
  private _toastP = inject(ToastP);
  //#endregion

  //#region Lifecycle
  public ngOnInit() {
    this._route.queryParams.subscribe((args) => {
      if (Object.keys(args).length === 0) { return; }

      this._serviceP.get<any>('/guest/search', args).subscribe({
        next: (res) => {
          if (res.status) {  }
          else {
            if (res.statusCode.startsWith('400')) { this._toastP.tWarn(res.message); }
            else { this._toastP.tErr(res.message); }
          }
        },
        error: (err) => { this._toastP.tErr('Network Error'); },
      });
    });
  }
  //#endregion
}
