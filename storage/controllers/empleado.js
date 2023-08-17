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
export class Empleados {
    constructor(data) {
        Object.assign(this, data);
        this.nombre = "";
        this.apellido = "";
        this.DNI = 1;
        this.direccion = "";
        this.telefono = "";
        this.cargo = "";
    }
}
__decorate([
    Expose({ name: "empleado_nombre" }),
    IsDefined({ message: () => { throw { status: 422, message: "El parametro empleado_nombre es obligatorios" }; } }),
    __metadata("design:type", String)
], Empleados.prototype, "nombre", void 0);
__decorate([
    Expose({ name: "empleado_apellido" }),
    IsDefined({ message: () => { throw { status: 422, message: "El parametro empleado_apellido es obligatorios" }; } }),
    __metadata("design:type", String)
], Empleados.prototype, "apellido", void 0);
__decorate([
    Expose({ name: "dni" }),
    IsDefined({ message: () => { throw { status: 422, message: "El parametro dni es obligatorios" }; } }),
    __metadata("design:type", Number)
], Empleados.prototype, "DNI", void 0);
__decorate([
    Expose({ name: "empleado_direccion" }),
    IsDefined({ message: () => { throw { status: 422, message: "El parametro empleado_direccion es obligatorios" }; } }),
    __metadata("design:type", String)
], Empleados.prototype, "direccion", void 0);
__decorate([
    Expose({ name: "empleado_telefono" }),
    IsDefined({ message: () => { throw { status: 422, message: "El parametro empleado_telefono es obligatorios" }; } }),
    __metadata("design:type", String)
], Empleados.prototype, "telefono", void 0);
__decorate([
    Expose({ name: "cargo" }),
    IsDefined({ message: () => { throw { status: 422, message: "El parametro cargo es obligatorios" }; } }),
    __metadata("design:type", String)
], Empleados.prototype, "cargo", void 0);
