import { Expose } from "class-transformer";
import { IsDefined } from "class-validator";

export class Clientes {

  @Expose({ name: "cliente_nombre" })
  @IsDefined({ message: () => { throw { status: 422, message: "El parametro cliente_nombre es obligatorios" } } })
  nombre: string;

  @Expose({ name: "cliente_apellido" })
  @IsDefined({ message: () => { throw { status: 422, message: "El parametro cliente_apellido es obligatorios" } } })
  apellido: string;

  @Expose({ name: "dni" })
  @IsDefined({ message: () => { throw { status: 422, message: "El parametro dni es obligatorios" } } })
  DNI: number;

  @Expose({ name: "cliente_direccion" })
  @IsDefined({ message: () => { throw { status: 422, message: "El parametro cliente_direccion es obligatorios" } } })
  direccion: string;

  @Expose({ name: "cliente_telefono" })
  @IsDefined({ message: () => { throw { status: 422, message: "El parametro cliente_telefono es obligatorios" } } })
  telefono: string;

  @Expose({ name: "email" })
  @IsDefined({ message: () => { throw { status: 422, message: "El parametro email es obligatorios" } } })
  email: string;

  constructor(data: Partial<Clientes>) {
    Object.assign(this, data);
    this.nombre = "";
    this.apellido = "";
    this.DNI = 1;
    this.direccion = "";
    this.telefono = "";
    this.email = "";
  }
}
