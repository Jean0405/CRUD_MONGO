import { Expose } from "class-transformer";
import { IsDefined } from "class-validator";

export class Automovil {

  @Expose({ name: "auto_marca" })
  @IsDefined({ message: () => { throw { status: 422, message: "El parametro 'auto_marca' es obligatorio" } } })
  marca: string;

  @Expose({ name: "auto_modelo" })
  @IsDefined({ message: () => { throw { status: 422, message: "El parametro 'auto_modelo' es obligatorio" } } })
  modelo: string

  @Expose({ name: "auto_anio" })
  @IsDefined({ message: () => { throw { status: 422, message: "El parametro 'auto_anio' es obligatorio" } } })
  anio: number;

  @Expose({ name: "auto_tipo" })
  @IsDefined({ message: () => { throw { status: 422, message: "El parametro 'auto_tipo' es obligatorio" } } })
  tipo: string;

  @Expose({ name: "auto_capacidad" })
  @IsDefined({ message: () => { throw { status: 422, message: "El parametro 'auto_capacidad' es obligatorio" } } })
  capacidad: number;

  @Expose({ name: "auto_precio_diario" })
  @IsDefined({ message: () => { throw { status: 422, message: "El parametro 'auto_precio_diario' es obligatorio" } } })
  precio_diario: number;

  constructor(data: Partial<Automovil>) {
    Object.assign(this, data);
    this.marca = "";
    this.modelo = "";
    this.anio = 0;
    this.tipo = "";
    this.capacidad = 0;
    this.precio_diario = 0;
  }
}
