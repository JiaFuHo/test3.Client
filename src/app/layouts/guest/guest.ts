import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { Header } from './header/header';

@Component({
  selector: 'app-guest',
  imports: [RouterOutlet, Header],
  templateUrl: './guest.html',
  styleUrl: './guest.css',
})
export class Guest {}
