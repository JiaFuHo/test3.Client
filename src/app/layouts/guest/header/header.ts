import { Component } from '@angular/core';

import { CoreModule } from '../../../shared/module/core';

import { ModalSearch } from '../../../features/guest/common/modal-search/modal-search';

@Component({
  selector: 'app-header',
  imports: [CoreModule, ModalSearch],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {}
