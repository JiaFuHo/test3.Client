import { Component, inject, OnInit, signal } from '@angular/core';

import { FavQueryReq } from '../../../../core/models/guest/test3VmG';
import { FavS } from '../../../../core/services/guest/info/favS';
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
  private _favS = inject(FavS);
  //#endregion

  //#region Lifecycle
  public ngOnInit() {}
  //#endregion

  //#region Method

  //#endregion
}
