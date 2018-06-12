import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminPageModule } from './admin-page/admin-page.module';
import { ModuleWithProviders } from '@angular/compiler/src/core';
import { LoginModule } from './login/login.module';
import { SigninComponent } from './login/signin/signin.component';

const routes: Routes = [
  { path: 'admin', loadChildren: './admin-page/admin-page.module#AdminPageModule' },
  { path: 'user', loadChildren: './user-page/user-page.module#UserPageModule' },
  { path: 'login', loadChildren: './login/login.module#LoginModule'  },
  { path: '', redirectTo: 'user', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
