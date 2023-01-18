import { Router } from '@angular/router';
import { UsersService } from './../services/users.service';
import { Component } from '@angular/core';
import Usuario from '../model/usuario';
import { FormBuilder } from '@angular/forms';
import usuario from '../model/usuario';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent {

  constructor(private usersService: UsersService, private formBuilder: FormBuilder, private route:Router) {


  };

  cadastroForm = this.formBuilder.group({
    nome: '',
    senha: '',
    email: ''
  });

  onSubmit() {

    const usuario = new Usuario(this.cadastroForm.value.nome ?? '', this.cadastroForm.value.email ?? '', this.cadastroForm.value.senha ?? '');

    this.usersService.adicionarUsuario(usuario).subscribe((retorno: any) => {
      console.log(retorno);
      this.route.navigate(["/login"]);
    });
  }

}
//32:06
