import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminPageModule } from './admin-page/admin-page.module';
import { ModuleWithProviders } from '@angular/compiler/src/core';

const routes: Routes = [
  { path: 'admin', loadChildren: './admin-page/admin-page.module#AdminPageModule' },
  { path: 'user', loadChildren: './user-page/user-page.module#UserPageModule' },
  { path: 'auth', loadChildren: './auth/auth.module#AuthModule'  },
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
