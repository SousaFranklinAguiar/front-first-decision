import {Component, OnInit} from '@angular/core';
import {UsuariosService} from "../service/usuarios.service";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css']
})
export class ListarComponent implements OnInit{

  usuarios: any[] = [];
  constructor(private usuarioService: UsuariosService) {
  }

  ngOnInit(): void {
    this.carregarUsuarios()
  }

  carregarUsuarios(): void {
    this.usuarioService.listar().subscribe(
      (usuarios: any[]) => {
        this.usuarios = usuarios;
      },
      (erro) => {
        alert('Erro: ' + erro.error.erro);
      }
    );
  }

  excluirUsuario(usuarioId: number): void {
    this.usuarioService.excluir(usuarioId).subscribe(
      (res) => {
        alert(res.mensagem);
        this.carregarUsuarios();
      },
      (erro) => {
        alert('Erro: ' + erro.error.erro);
      }
    );
  }

}
