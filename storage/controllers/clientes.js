var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Expose } from "class-transformer";
import { IsDefined } from "class-validator";
export class Clientes {
    constructor(data) {
        Object.assign(this, data);
        this.nombre = "";
        this.apellido = "";
        this.DNI = 1;
        this.direccion = "";
        this.telefono = "";
        this.email = "";
    }
}
__decorate([
    Expose({ name: "cliente_nombre" }),
    IsDefined({ message: () => { throw { status: 422, message: "El parametro cliente_nombre es obligatorios" }; } }),
    __metadata("design:type", String)
], Clientes.prototype, "nombre", void 0);
__decorate([
    Expose({ name: "cliente_apellido" }),
    IsDefined({ message: () => { throw { status: 422, message: "El parametro cliente_apellido es obligatorios" }; } }),
    __metadata("design:type", String)
], Clientes.prototype, "apellido", void 0);
__decorate([
    Expose({ name: "dni" }),
    IsDefined({ message: () => { throw { status: 422, message: "El parametro dni es obligatorios" }; } }),
    __metadata("design:type", Number)
], Clientes.prototype, "DNI", void 0);
__decorate([
    Expose({ name: "cliente_direccion" }),
    IsDefined({ message: () => { throw { status: 422, message: "El parametro cliente_direccion es obligatorios" }; } }),
    __metadata("design:type", String)
], Clientes.prototype, "direccion", void 0);
__decorate([
    Expose({ name: "cliente_telefono" }),
    IsDefined({ message: () => { throw { status: 422, message: "El parametro cliente_telefono es obligatorios" }; } }),
    __metadata("design:type", String)
], Clientes.prototype, "telefono", void 0);
__decorate([
    Expose({ name: "email" }),
    IsDefined({ message: () => { throw { status: 422, message: "El parametro email es obligatorios" }; } }),
    __metadata("design:type", String)
], Clientes.prototype, "email", void 0);
