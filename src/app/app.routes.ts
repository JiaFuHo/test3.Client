import { Routes } from '@angular/router';

import { Guest } from './layouts/guest/guest';
import { Home } from './features/guest/home/home';
import { Collection } from './features/guest/collection/collection';
import { Login } from './features/guest/login/login';
import { Search } from './features/guest/search/search';

export const routes: Routes = [
  {
    path: '',
    component: Guest,
    children: [
      {
        path: 'home',
        component: Home,
      },
      {
        path: 'collection',
        component: Collection,
      },
      {
        path: 'login',
        component: Login,
      },
      {
        path: 'search',
        component: Search,
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
    ],
  },
];
