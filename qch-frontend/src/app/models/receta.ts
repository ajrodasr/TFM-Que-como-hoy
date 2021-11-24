import { Ingrediente } from './ingrediente';
import { TipoReceta } from './tipo-receta';
import { UsuarioReceta } from './usuario-receta';

export class Receta {
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
  ingredientes: Ingrediente[];
  likes: string[];
  publicada: boolean;

  constructor(
    id: number = -1,
    titulo: string = '',
    imagen: string = '',
    instrucciones: string = '',
    fechaCreacion: Date = new Date(),
    tiempo: number = -1,
    comensales: number = -1,
    dificultad: string = '',
    usuario: UsuarioReceta = new UsuarioReceta(),
    tipoReceta: TipoReceta = new TipoReceta(),
    ingredientes: Ingrediente[] = [],
    likes: string[] = [],
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
    this.ingredientes = ingredientes;
    this.likes = likes;
    this.publicada = publicada;
  }
}
