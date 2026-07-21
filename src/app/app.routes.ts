import { Routes } from '@angular/router';

import { Guest } from './layouts/guest/guest';
import { LoginG } from './features/guest/login/login';
import { HomeG } from './features/guest/home/home';
import { Collection } from './features/guest/collection/collection';
import { Search } from './features/guest/search/search';

import { Admin } from './layouts/admin/admin';
import { LoginA } from './features/admin/login/login';
import { HomeA } from './features/admin/home/home';

export const routes: Routes = [
  //#region Guest
  {
    path: '',
    component: Guest,
    children: [
      {
        path: 'loginG',
        component: LoginG,
      },
      {
        path: 'loginA',
        component: LoginA,
      },
      {
        path: 'home',
        component: HomeG,
      },
      {
        path: 'collection',
        component: Collection,
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
  //#endregion

  //#region Admin
  {
    path: 'admin',
    component: Admin,
    children: [
      {
        path: 'home',
        component: HomeA,
      },
      {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full',
      },
    ],
  },
  //#endregion
];
