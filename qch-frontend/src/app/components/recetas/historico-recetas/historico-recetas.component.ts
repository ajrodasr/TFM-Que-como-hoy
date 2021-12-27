import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { LikeReceta } from 'src/app/models/like-receta';
import { Paginador } from 'src/app/models/paginador';
import { RecetaConsumida } from 'src/app/models/receta-consumida';
import { RecetaHistorico } from 'src/app/models/receta-historico';
import { AuthService } from 'src/app/services/auth.service';
import { RecetaService } from 'src/app/services/receta.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-historico-recetas',
  templateUrl: './historico-recetas.component.html',
  styleUrls: ['./historico-recetas.component.css'],
})
export class HistoricoRecetasComponent implements OnInit {
  BACK_URL_IMAGES = environment.APIEndpoint + 'images/';

  idUsuario: string;

  // Recetas
  recetas: RecetaHistorico[];
  likes: number[];
  // Paginador
  paginador: Paginador;

  // Formulario
  idReceta: FormControl;
  fecha: FormControl;
  nuevaFecha: FormControl;
  editarHistoricoForm: FormGroup;

  mensaje: string;
  mensajeEliminado: string;
  error = false;

  constructor(
    private formBuilder: FormBuilder,
    private recetaService: RecetaService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.idUsuario = this.authService.getUsername();
    forkJoin([
      this.recetaService.getHistoricoRecetas(this.idUsuario),
      this.recetaService.getLikesUsuario(this.idUsuario),
    ]).subscribe((data) => {
      this.recetas = data[0].list;
      this.paginador = new Paginador(data[0]);
      this.likes = data[1];
    });

    this.idReceta = new FormControl('');
    this.fecha = new FormControl(
      formatDate(new Date(), 'yyyy-MM-ddTHH:mm', 'en')
    );
    this.nuevaFecha = new FormControl(
      formatDate(new Date(), 'yyyy-MM-ddTHH:mm', 'en')
    );

    this.editarHistoricoForm = this.formBuilder.group({
      idReceta: this.idReceta,
      fecha: this.fecha,
      nuevaFecha: this.nuevaFecha,
    });
  }

  like(id: number): boolean {
    return this.likes.includes(id);
  }

  onLike(idReceta: number): void {
    const like = new LikeReceta(idReceta, this.idUsuario);
    this.recetaService.like(like).subscribe((data) => {
      this.likes.push(idReceta);
      this.recetas.forEach((receta) => {
        if (receta.id === idReceta) {
          receta.likes++;
        }
      });
    });
  }

  onDislike(idReceta: number): void {
    const like = new LikeReceta(idReceta, this.idUsuario);
    this.recetaService.dislike(like).subscribe((data) => {
      this.likes = this.likes.filter((id) => id !== idReceta);
      this.recetas.forEach((receta) => {
        if (receta.id === idReceta) {
          receta.likes--;
        }
      });
    });
  }

  onNavigate(pageNum: number = 1): void {
    this.recetaService
      .getHistoricoRecetas(this.idUsuario, pageNum)
      .subscribe((data) => {
        this.recetas = data.list;
        this.paginador = new Paginador(data);
      });
  }

  getFechaConsumicion(idReceta: number, fechaConsumicionReceta: Date): string {
    const receta = this.recetas.find((recetaEncontrada) => {
      if (
        recetaEncontrada.id === idReceta &&
        recetaEncontrada.fechaConsumicion === fechaConsumicionReceta
      ) {
        return recetaEncontrada;
      }
    });
    const fechaConsumicion = receta.fechaConsumicion;
    return `Consumida el ${fechaConsumicion[2].toLocaleString('en-US', {
      minimumIntegerDigits: 2,
      useGrouping: false,
    })}/${fechaConsumicion[1].toLocaleString('en-US', {
      minimumIntegerDigits: 2,
      useGrouping: false,
    })}/${fechaConsumicion[0].toLocaleString('en-US', {
      minimumIntegerDigits: 2,
      useGrouping: false,
    })} a las ${fechaConsumicion[3].toLocaleString('en-US', {
      minimumIntegerDigits: 2,
      useGrouping: false,
    })}:${fechaConsumicion[4].toLocaleString('en-US', {
      minimumIntegerDigits: 2,
      useGrouping: false,
    })}`;
  }

  formatFechaToInput(fecha: Date): string {
    return `${fecha[0].toLocaleString('en-US', {
      minimumIntegerDigits: 2,
      useGrouping: false,
    })}-${fecha[1].toLocaleString('en-US', {
      minimumIntegerDigits: 2,
      useGrouping: false,
    })}-${fecha[2].toLocaleString('en-US', {
      minimumIntegerDigits: 2,
      useGrouping: false,
    })}T${fecha[3].toLocaleString('en-US', {
      minimumIntegerDigits: 2,
      useGrouping: false,
    })}:${fecha[4].toLocaleString('en-US', {
      minimumIntegerDigits: 2,
      useGrouping: false,
    })}`;
  }

  onSetForm(idReceta: number, fechaConsumicionReceta: Date): void {
    this.mensaje = '';
    this.mensajeEliminado = '';
    this.error = false;
    this.idReceta.setValue(idReceta);
    this.fecha.setValue(this.formatFechaToInput(fechaConsumicionReceta));
    this.nuevaFecha.setValue(this.formatFechaToInput(fechaConsumicionReceta));
  }

  onSaveHistorico(): void {
    const recetaConsumida = new RecetaConsumida(
      this.idUsuario,
      this.idReceta.value,
      this.fecha.value
    );
    this.recetaService
      .updateConsumida(recetaConsumida, this.nuevaFecha.value)
      .subscribe(
        (data) => {
          this.mensaje = data.mensaje;
          this.error = false;
          this.onNavigate(this.paginador.paginaActual);
        },
        (err) => {
          this.mensaje = err.error;
          this.error = true;
        }
      );
  }

  onDeleteHistorico(): void {
    if (
      confirm('¿Seguro de que desea eliminar esta consumición de su historico?')
    ) {
      const recetaConsumida = new RecetaConsumida(
        this.idUsuario,
        this.idReceta.value,
        this.fecha.value
      );
      this.recetaService.deleteConsumida(recetaConsumida).subscribe(
        (data) => {
          this.mensajeEliminado = data.mensaje;
          this.error = false;
          this.onNavigate(this.paginador.paginaActual);
        },
        (err) => {
          this.mensajeEliminado = err.error;
          this.error = true;
        }
      );
    }
  }
}
