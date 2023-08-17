import { IsDefined, IsString, Matches } from "class-validator";
import { Expose, Transform } from "class-transformer";

export class Reserva {
  @Expose({ name: "cliente_id" })
  @IsDefined({ message: () => { throw { status: 422, message: "El parametro cliente_id es obligatorio" } } })
  ID_cliente: number;

  @Expose({ name: "automovil_id" })
  @IsDefined({ message: () => { throw { status: 422, message: "El parametro automovil_id es obligatorio" } } })
  ID_automovil: number;

  @Expose({ name: "fecha_reserva" })
  @IsDefined({ message: () => { throw { status: 422, message: `El parametro fecha_reserva es obligatorio` } } })
  @IsString({ message: 'El parametro fecha_reserva debe ser un string' })
  @Matches(/^\d{4}-\d{2}-\d{2$}/, { message: 'Error en los parametros de entrada' })
  fecha_reserva: string;

  @Expose({ name: "fecha_inicio" })
  @IsDefined({ message: () => { throw { status: 422, message: `El parametro fecha_inicio es obligatorio` } } })
  @IsString({ message: 'El parametro fecha_inicio debe ser un string' })
  @Matches(/^\d{4}-\d{2}-\d{2$}/, { message: 'Error en los parametros de entrada' })
  fecha_inicio: string;

  @Expose({ name: "fecha_fin" })
  @IsDefined({ message: () => { throw { status: 422, message: `El parametro fecha_fin es obligatorio` } } })
  @IsString({ message: 'El parametro fecha_fin debe ser un string' })
  @Matches(/^\d{4}-\d{2}-\d{2$}/, { message: 'Error en los parametros de entrada' })
  fecha_fin: string;


  @Expose({ name: "estado" })
  @IsDefined({ message: () => { throw { status: 422, message: "El parametro estado es obligatorio" } } })
  estado: string;

  constructor(data: Partial<Reserva>) {
    Object.assign(this, data);
    this.ID_cliente = 0;
    this.ID_automovil = 0;
    this.fecha_reserva = "0000-00-00";
    this.fecha_inicio = "0000-00-00";
    this.fecha_fin = "0000-00-00";
    this.estado = "";
  }
}
