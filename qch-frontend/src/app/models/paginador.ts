export class Paginador {
  primerElemento: number;
  ultimoElemento: number;
  total: number;
  esPrimera: boolean;
  esUltima: boolean;
  primeraPagina: number;
  ultimaPagina: number;
  paginas: number[];
  siguientePagina: number;
  anteriorPagina: number;
  paginaActual: number;

  constructor(data) {
    this.primerElemento = data.startRow;
    this.ultimoElemento = data.endRow;
    this.total = data.total;
    this.esPrimera = data.isFirstPage;
    this.esUltima = data.isLastPage;
    this.primeraPagina = data.navigateFirstPage;
    this.ultimaPagina = data.navigateLastPage;
    this.paginas = data.navigatepageNums;
    this.siguientePagina = data.nextPage;
    this.anteriorPagina = data.prePage;
    this.paginaActual = data.pageNum;
  }
}
