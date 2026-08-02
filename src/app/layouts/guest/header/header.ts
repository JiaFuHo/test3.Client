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
  public search() {
    const modalElem = document.getElementById('modal_search');

    if (modalElem) { bootstrap.Modal.getOrCreateInstance(modalElem)?.show(); }
  }
  //#endregion
}
