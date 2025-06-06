export class Localidad {
  public denominacion: string;
  public codPostal: string;

  constructor(
    denominacion: string,
    codPostal: string,

  ) {
    this.denominacion = denominacion;
    this.codPostal = codPostal;
  }
}