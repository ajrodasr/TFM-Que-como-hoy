import { Ingrediente } from './ingrediente';
import { TipoReceta } from './tipo-receta';
import { UsuarioReceta } from './usuario-receta';

export class Receta {
  id: number;
  titulo: string;
  descripcion: string;
  instrucciones: string;
  fechaCreacion: Date;
  usuario: UsuarioReceta;
  tipoReceta: TipoReceta;
  ingredientes: Ingrediente[];
  likes: string[];

  constructor(
    id: number = -1,
    titulo: string = '',
    descripcion: string = '',
    instrucciones: string = '',
    fechaCreacion: Date = new Date(),
    usuario: UsuarioReceta = new UsuarioReceta(),
    tipoReceta: TipoReceta = new TipoReceta(),
    ingredientes: Ingrediente[] = [],
    likes: string[] = []
  ) {
    this.id = id;
    this.titulo = titulo;
    this.descripcion = descripcion;
    this.instrucciones = instrucciones;
    this.fechaCreacion = fechaCreacion;
    this.usuario = usuario;
    this.tipoReceta = tipoReceta;
    this.ingredientes = ingredientes;
    this.likes = likes;
  }
}
