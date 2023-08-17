import { Expose } from "class-transformer";
import { IsDefined } from "class-validator";

export class Empleados {

  @Expose({ name: "empleado_nombre" })
  @IsDefined({ message: () => { throw { status: 422, message: "El parametro empleado_nombre es obligatorios" } } })
  nombre: string;

  @Expose({ name: "empleado_apellido" })
  @IsDefined({ message: () => { throw { status: 422, message: "El parametro empleado_apellido es obligatorios" } } })
  apellido: string;

  @Expose({ name: "dni" })
  @IsDefined({ message: () => { throw { status: 422, message: "El parametro dni es obligatorios" } } })
  DNI: number;

  @Expose({ name: "empleado_direccion" })
  @IsDefined({ message: () => { throw { status: 422, message: "El parametro empleado_direccion es obligatorios" } } })
  direccion: string;

  @Expose({ name: "empleado_telefono" })
  @IsDefined({ message: () => { throw { status: 422, message: "El parametro empleado_telefono es obligatorios" } } })
  telefono: string;

  @Expose({ name: "cargo" })
  @IsDefined({ message: () => { throw { status: 422, message: "El parametro cargo es obligatorios" } } })
  cargo: string;

  constructor(data: Partial<Empleados>) {
    Object.assign(this, data);
    this.nombre = "";
    this.apellido = "";
    this.DNI = 1;
    this.direccion = "";
    this.telefono = "";
    this.cargo = "";
  }
}
