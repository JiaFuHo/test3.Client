import { Component, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';

import { LoginS } from '../../../core/services/common/login/loginS';

import { InfoX } from './infoX/infoX';
import { Fav } from './fav/fav';
import { Rsv } from './rsv/rsv';
import { Hx } from './hx/hx';
import { Msg } from './msg/msg';

@Component({
  selector: 'app-info',
  imports: [InfoX, Fav, Rsv, Hx, Msg],
  templateUrl: './info.html',
  styleUrl: './info.css',
})
export class Info implements OnInit {
  //#region State
  private _loginS = inject(LoginS);
  private _router = inject(Router);

  public isActive = signal<string>('infoX');
  //#endregion

  //#region Lifecycle
  public ngOnInit() {}
  //#endregion

  //#region Method
  public logout() {
    if (confirm("確定登出?")) {
      localStorage.removeItem('client');

      this._loginS.client.set(null);
      this._router.navigate(['/']);
    }
  }
  //#endregion
}
