import { Component } from '@angular/core';

import { CoreModule } from '../../../shared/module/core';

@Component({
  selector: 'app-footer',
  imports: [CoreModule],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {}
