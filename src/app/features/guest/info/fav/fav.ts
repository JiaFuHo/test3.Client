import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { FavQueryReq, FavInfo } from '../../../../core/models/guest/test3VmG';
import { FavS } from '../../../../core/services/guest/info/favS';
import { LoginS } from '../../../../core/services/common/login/loginS';
import { ToastP } from '../../../../core/providers/common/toastP';

import { Btn } from '../../../../shared/widgets/btn/btn';

@Component({
  selector: 'app-fav',
  imports: [],
  templateUrl: './fav.html',
  styleUrl: './fav.css',
})
export class Fav implements OnInit {
  //#region State
  private _dr = inject(DestroyRef);

  private _favS = inject(FavS);
  private _loginS = inject(LoginS);
  private _toastP = inject(ToastP);

  public favList = signal<FavInfo[]>([]);
  //#endregion

  //#region Lifecycle
  public ngOnInit() {
    const args = new FavQueryReq();

    args.guid = this._loginS.client()!.guid;

    this._favS.get(args).pipe(takeUntilDestroyed(this._dr)).subscribe({
      next: (res) => {
        if (res.status) { this.favList.set(res.favList); }
        else {
          if (res.statusCode.startsWith('400')) { this._toastP.tWarn(res.message); }
          else { this._toastP.tErr(res.message); }
        }
      },
      error: () => { this._toastP.tErr('Network Error'); }
    });
  }
  //#endregion

  //#region Method
  public create() {}

  public delete() {}
  //#endregion
}
