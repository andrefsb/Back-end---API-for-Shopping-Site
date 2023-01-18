import { AuthService } from './services/auth.service';
import { CadastroComponent } from './cadastro/cadastro.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "home",
    component: HomeComponent,
    canActivate: [AuthService]
  },
  {
    path: "cadastro",
    component: CadastroComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
