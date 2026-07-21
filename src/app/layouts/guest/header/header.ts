import { Component } from '@angular/core';

import { CoreModule } from '../../../shared/module/core';

@Component({
  selector: 'app-header',
  imports: [CoreModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {}
