import { Component } from '@angular/core';

import { Accordion } from './accordion/accordion';

@Component({
  selector: 'app-collection',
  imports: [Accordion],
  templateUrl: './collection.html',
  styleUrl: './collection.css',
})
export class Collection {}
