import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UsuariosService} from "../service/usuarios.service";


@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent {

  cadastroForm: FormGroup;
  submitted = false;

  hideConfirmPassword: boolean = true;
  hidePassword: boolean = true;
  constructor(private fb: FormBuilder,
              private usuarioService: UsuariosService) {
    this.cadastroForm = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
      confirmacaoSenha: ['', Validators.required]
    }, { validator: this.senhasIguais });
  }

  senhasIguais(group: FormGroup) {
    const senha = group.get('senha')?.value;
    const confirmacao = group.get('confirmacaoSenha')?.value;
    return senha === confirmacao ? null : { senhasDiferentes: true };
  }

  onSubmit() {
    this.submitted = true;
    if (this.cadastroForm.invalid) return;

    this.usuarioService.cadastrar(this.cadastroForm.value).subscribe({
      next: (res) => {
        alert(res.mensagem);
        window.location.reload();
      },
      error: (err) => {
        alert('Erro: ' + err.error.erro);
      }
    });
  }

  get f() {
    return this.cadastroForm.controls;
  }
}
