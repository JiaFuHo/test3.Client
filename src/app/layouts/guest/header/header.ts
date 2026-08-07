import { Component } from '@angular/core';

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
  //#region Method
  public close() {
    const tElem = document.getElementById('menu');

    if (tElem) { bootstrap.Collapse.getOrCreateInstance(tElem)?.hide(); }
  }

  public search() {
    const tElem1 = document.getElementById('menu');
    const tElem2 = document.getElementById('modal_search');

    if (tElem1) { bootstrap.Collapse.getOrCreateInstance(tElem1)?.hide(); }
    if (tElem2) { bootstrap.Modal.getOrCreateInstance(tElem2)?.show(); }
  }

  public toggle() {
    const tElem = document.getElementById('menu');

    if (tElem) { bootstrap.Collapse.getOrCreateInstance(tElem)?.toggle(); }
  }
  //#endregion
}
