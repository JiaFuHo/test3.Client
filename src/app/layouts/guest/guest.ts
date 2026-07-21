import { Component } from '@angular/core';

import { CoreModule } from '../../shared/module/core';

import { Header } from './header/header';
import { Footer } from './footer/footer';

@Component({
  selector: 'app-guest',
  imports: [CoreModule, Header, Footer],
  templateUrl: './guest.html',
  styleUrl: './guest.css',
})
export class Guest {}
