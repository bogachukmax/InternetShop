import { Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { AdminComponent } from './admin/admin.component';
import { ItemPageComponent } from './item-page/item-page.component';
import { ErrorPageComponent } from './error-page/error-page.component';

export const routes: Routes = [
   {
      path:"",
      component: MainComponent,
      title: "Main"
   },
   {
      path:"shop",
      component: MainComponent,
      title: "Main"
   },
   {
      path: 'admin',
      component: AdminComponent,
      title: 'Admin'
   },
   {
      path: 'item/:index',
      component: ItemPageComponent,
   },
   {
      path: "**",
      component: ErrorPageComponent,
      title: 'Error'
   },
];
