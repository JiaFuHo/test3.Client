import { Component, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

import { LoginS } from '../../../core/services/common/login/loginS';

import { CoreModule } from '../../../shared/modules/core';

import { ModalSearch } from '../../../features/guest/common/modal-search/modal-search';

import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-header',
  imports: [CoreModule, ModalSearch],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  //#region State
  private _router = inject(Router);

  public loginS = inject(LoginS);
  public path = signal<string>('');

  public isHover = signal<boolean>(false);
  public isToggle = signal<boolean>(false);
  //#endregion

  //#region Constructor
  constructor() {
     this._router.events.pipe(filter(e => e instanceof NavigationEnd), takeUntilDestroyed())
                        .subscribe((e: any) => { this.path.set(e.urlAfterRedirects); });
  }
  //#endregion

  //#region Method
  public close() {
    const tElem = document.getElementById('menu');

    if (tElem) { bootstrap.Collapse.getOrCreateInstance(tElem)?.hide(); }

    this.isToggle.set(false);
  }

  public logout() {
    localStorage.removeItem('client');

    this.loginS.client.set(null);
    this._router.navigate(['/']);

    this.isHover.set(false);
  }

  public search() {
    const tElem1 = document.getElementById('menu');
    const tElem2 = document.getElementById('modal_search');

    if (tElem1) { bootstrap.Collapse.getOrCreateInstance(tElem1)?.hide(); }
    if (tElem2) { bootstrap.Modal.getOrCreateInstance(tElem2)?.show(); }

    this.isToggle.set(false);
  }

  public toggle() {
    const tElem = document.getElementById('menu');

    if (tElem) { bootstrap.Collapse.getOrCreateInstance(tElem)?.toggle(); }

    this.isToggle.update(x => !x);
  }
  //#endregion
}
