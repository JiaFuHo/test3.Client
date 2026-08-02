import { Component, ChangeDetectorRef, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

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
  private _cdr = inject(ChangeDetectorRef);
  private _route = inject(ActivatedRoute);
  private _router = inject(Router);
  private _serviceP = inject(ServiceP);
  private _toastP = inject(ToastP);

  public bookInfo: any = null;
  //#endregion

  //#region Lifecycle
  public ngOnInit() {
    this._route.queryParams.subscribe((args) => {
      if (Object.keys(args).length === 0) { return; }

      this.bookInfo = null;
      this._router.navigate(['/search'], { replaceUrl: true });

      this._serviceP.get<any>('/guest/search', args).subscribe({
        next: (res) => {
          if (res.status) {
            this.bookInfo = res.bookInfo;
            this._toastP.tInfo(res.message);
          }
          else {
            if (res.statusCode.startsWith('400')) { this._toastP.tWarn(res.message); }
            else { this._toastP.tErr(res.message); }
          }

          this._cdr.detectChanges();
        },
        error: (err) => {
          this._toastP.tErr('Internet Error');
          this._cdr.detectChanges();
        },
      });
    });
  }
  //#endregion
}
