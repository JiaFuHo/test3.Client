import { Component } from '@angular/core';

import { SwiperNew } from '../common/swiper-new/swiper-new';
import { SwiperPop } from '../common/swiper-pop/swiper-pop';
import { Tree } from '../common/tree/tree';

@Component({
  selector: 'app-home',
  imports: [SwiperNew, SwiperPop, Tree],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class HomeG {}
