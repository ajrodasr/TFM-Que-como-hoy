import { TipoReceta } from './tipo-receta';
import { UsuarioReceta } from './usuario-receta';

export class RecetaLista {
  id: number;
  titulo: string;
  imagen: string;
  instrucciones: string;
  fechaCreacion: Date;
  tiempo: number;
  comensales: number;
  dificultad: string;
  usuario: UsuarioReceta;
  tipoReceta: TipoReceta;
  likes: number;
  publicada: boolean;

  constructor(
    id: number = -1,
    titulo: string = '',
    imagen: string = '',
    instrucciones: string = '',
    fechaCreacion: Date = new Date(),
    tiempo: number = 0,
    comensales: number = 0,
    dificultad: string = '',
    usuario: UsuarioReceta = new UsuarioReceta(),
    tipoReceta: TipoReceta = new TipoReceta(),
    likes: number = 0,
    publicada: boolean = false
  ) {
    this.id = id;
    this.titulo = titulo;
    this.imagen = imagen;
    this.instrucciones = instrucciones;
    this.fechaCreacion = fechaCreacion;
    this.tiempo = tiempo;
    this.comensales = comensales;
    this.dificultad = dificultad;
    this.usuario = usuario;
    this.tipoReceta = tipoReceta;
    this.likes = likes;
    this.publicada = publicada;
  }
}
