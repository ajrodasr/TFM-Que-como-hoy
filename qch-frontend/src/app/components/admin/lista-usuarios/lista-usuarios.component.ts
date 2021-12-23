import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Paginador } from 'src/app/models/paginador';
import { UsuarioListado } from 'src/app/models/usuario-listado';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.css'],
})
export class ListaUsuariosComponent implements OnInit {
  usuarios: UsuarioListado[];

  // Paginador
  paginador: Paginador;

  // Filtro
  term: FormControl;
  filtroForm: FormGroup;

  constructor(
    private usuariosService: UsuarioService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.term = new FormControl('');

    this.filtroForm = this.formBuilder.group({
      term: this.term,
    });

    this.onFilter();
  }

  onFilter(pageNum: number = 1): void {
    this.usuariosService
      .getUsuarios(this.term.value, pageNum)
      .subscribe((data) => {
        this.usuarios = data.list;
        this.paginador = new Paginador(data);
      });
  }
}
