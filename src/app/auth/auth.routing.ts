import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ModuleWithProviders } from "@angular/compiler/src/core";
import { SigninComponent } from "./signin/signin.component";
import { SignupComponent } from "./signup/signup.component";

const routes: Routes = [
  { path: "signin", component: SigninComponent },
  { path: "signup", component: SignupComponent },
  { path: "", redirectTo: "signin", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {}
