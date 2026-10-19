import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { FavQueryReq, FavInfo, FavSaveReq } from '../../../../core/models/guest/test3VmG';
import { FavS } from '../../../../core/services/guest/info/favS';
import { LoginS } from '../../../../core/services/common/login/loginS';
import { ToastP } from '../../../../core/providers/common/toastP';

import { Btn } from '../../../../shared/widgets/btn/btn';
import { Page } from '../../../../shared/widgets/page_v2/page';

@Component({
  selector: 'app-fav',
  imports: [Btn, Page],
  templateUrl: './fav.html',
  styleUrl: './fav.css',
})
export class Fav implements OnInit {
  //#region State
  private _dr = inject(DestroyRef);

  private _favS = inject(FavS);
  private _loginS = inject(LoginS);
  private _toastP = inject(ToastP);

  public totalCount = signal<number>(0);
  public page = signal<number>(1);
  public size = signal<number>(5);
  public favList = signal<FavInfo[]>([]);
  //#endregion

  //#region Lifecycle
  public ngOnInit() { this._queryFav(); }
  //#endregion

  //#region Method
  private _queryFav() {
    const args = Object.assign(new FavQueryReq(), {
      page: this.page(),
      size: this.size(),
      guid: this._loginS.client()!.guid,
    });

    this._favS.get(args).pipe(takeUntilDestroyed(this._dr)).subscribe({
      next: (res) => {
        if (res.status) {
          this.totalCount.set(res.totalCount);
          this.page.set(Number(args.page) || 1);
          this.size.set(Number(args.size) || 5);
          this.favList.set(res.favList);
        }
        else {
          if (res.statusCode.startsWith('400')) { this._toastP.tWarn(res.message); }
          else { this._toastP.tErr(res.message); }
        }
      },
      error: () => { this._toastP.tErr('Network Error'); }
    });
  }

  public deleteFav(collectionId: string) {
    if (confirm("確定刪除?")) {
      const args = Object.assign(new FavSaveReq(), {
        guid: this._loginS.client()!.guid,
        collectionId: collectionId,
      });

      this._favS.delete(args).pipe(takeUntilDestroyed(this._dr)).subscribe({
        next: (res) => {
          if (res.status) {
            this._queryFav();
            this._toastP.tInfo(res.message);
          }
          else {
            if (res.statusCode.startsWith('400')) { this._toastP.tWarn(res.message); }
            else { this._toastP.tErr(res.message); }
          }
        },
        error: () => { this._toastP.tErr('Network Error'); }
      });
    }
  }

  public flip_v1(pageX: number) {
    this.page.set(pageX);
    this._queryFav();
  }

  public flip_v2() { this._queryFav(); }
  //#endregion
}
