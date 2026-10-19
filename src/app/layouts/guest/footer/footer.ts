import { Component } from '@angular/core';

import { CoreModule } from '../../../shared/modules/core';

@Component({
  selector: 'app-footer',
  imports: [CoreModule],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {}
