import { Router } from '@angular/router';
import { AuthService } from './../services/auth.service';
import { UsersService } from './../services/users.service';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private usersService: UsersService, 
    private formBuilder: FormBuilder,
    private AuthService: AuthService,
    private route: Router
    ) { }

  loginForm = this.formBuilder.group({
    senha: '',
    email: ''
  })

  onSubmit() {
    this.usersService.login(
      this.loginForm.value.email ?? '',
      this.loginForm.value.senha ?? ''
      ).subscribe((retorno) =>{
        this.AuthService.persistToken((retorno as any).accessToken);
        console.log("Deu certo?", retorno);
        this.route.navigate(["/home"]);
      })
  }

}
