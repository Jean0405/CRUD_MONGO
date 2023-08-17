var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { IsDefined, IsString, Matches } from "class-validator";
import { Expose } from "class-transformer";
export class Reserva {
    constructor(data) {
        Object.assign(this, data);
        this.ID_cliente = 0;
        this.ID_automovil = 0;
        this.fecha_reserva = "0000-00-00";
        this.fecha_inicio = "0000-00-00";
        this.fecha_fin = "0000-00-00";
        this.estado = "";
    }
}
__decorate([
    Expose({ name: "cliente_id" }),
    IsDefined({ message: () => { throw { status: 422, message: "El parametro cliente_id es obligatorio" }; } }),
    __metadata("design:type", Number)
], Reserva.prototype, "ID_cliente", void 0);
__decorate([
    Expose({ name: "automovil_id" }),
    IsDefined({ message: () => { throw { status: 422, message: "El parametro automovil_id es obligatorio" }; } }),
    __metadata("design:type", Number)
], Reserva.prototype, "ID_automovil", void 0);
__decorate([
    Expose({ name: "fecha_reserva" }),
    IsDefined({ message: () => { throw { status: 422, message: `El parametro fecha_reserva es obligatorio` }; } }),
    IsString({ message: 'El parametro fecha_reserva debe ser un string' }),
    Matches(/^\d{4}-\d{2}-\d{2$}/, { message: 'Error en los parametros de entrada' }),
    __metadata("design:type", String)
], Reserva.prototype, "fecha_reserva", void 0);
__decorate([
    Expose({ name: "fecha_inicio" }),
    IsDefined({ message: () => { throw { status: 422, message: `El parametro fecha_inicio es obligatorio` }; } }),
    IsString({ message: 'El parametro fecha_inicio debe ser un string' }),
    Matches(/^\d{4}-\d{2}-\d{2$}/, { message: 'Error en los parametros de entrada' }),
    __metadata("design:type", String)
], Reserva.prototype, "fecha_inicio", void 0);
__decorate([
    Expose({ name: "fecha_fin" }),
    IsDefined({ message: () => { throw { status: 422, message: `El parametro fecha_fin es obligatorio` }; } }),
    IsString({ message: 'El parametro fecha_fin debe ser un string' }),
    Matches(/^\d{4}-\d{2}-\d{2$}/, { message: 'Error en los parametros de entrada' }),
    __metadata("design:type", String)
], Reserva.prototype, "fecha_fin", void 0);
__decorate([
    Expose({ name: "estado" }),
    IsDefined({ message: () => { throw { status: 422, message: "El parametro estado es obligatorio" }; } }),
    __metadata("design:type", String)
], Reserva.prototype, "estado", void 0);
