import { Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { AdminComponent } from './admin/admin.component';

export const routes: Routes = [
   {
      path:"",
      component: MainComponent,
      title: "Main"
   },
   {
      path: 'admin',
      component: AdminComponent,
      title: 'Admin'
   }
];
