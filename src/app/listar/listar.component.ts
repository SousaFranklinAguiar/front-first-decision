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
    // Simulando dados - substitua pela chamada real ao serviço
    this.usuarioService.listar().subscribe(
      (usuarios: any[]) => {
        this.usuarios = usuarios;
      },
      (erro) => {
        console.error('Erro ao carregar usuários', erro);
      }
    );
  }

  excluirUsuario(usuarioId: number): void {
    this.usuarioService.excluir(usuarioId).subscribe(
      () => {
        alert('Usuário deletado com sucesso!');
        this.carregarUsuarios();
      },
      (erro) => {
        console.error('Erro ao excluir usuário', erro);
      }
    );
  }

}
