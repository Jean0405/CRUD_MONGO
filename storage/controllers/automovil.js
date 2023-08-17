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
export class Automovil {
    constructor(data) {
        Object.assign(this, data);
        this.marca = "";
        this.modelo = "";
        this.anio = 0;
        this.tipo = "";
        this.capacidad = 0;
        this.precio_diario = 0;
    }
}
__decorate([
    Expose({ name: "auto_marca" }),
    IsDefined({ message: () => { throw { status: 422, message: "El parametro 'auto_marca' es obligatorio" }; } }),
    __metadata("design:type", String)
], Automovil.prototype, "marca", void 0);
__decorate([
    Expose({ name: "auto_modelo" }),
    IsDefined({ message: () => { throw { status: 422, message: "El parametro 'auto_modelo' es obligatorio" }; } }),
    __metadata("design:type", String)
], Automovil.prototype, "modelo", void 0);
__decorate([
    Expose({ name: "auto_anio" }),
    IsDefined({ message: () => { throw { status: 422, message: "El parametro 'auto_anio' es obligatorio" }; } }),
    __metadata("design:type", Number)
], Automovil.prototype, "anio", void 0);
__decorate([
    Expose({ name: "auto_tipo" }),
    IsDefined({ message: () => { throw { status: 422, message: "El parametro 'auto_tipo' es obligatorio" }; } }),
    __metadata("design:type", String)
], Automovil.prototype, "tipo", void 0);
__decorate([
    Expose({ name: "auto_capacidad" }),
    IsDefined({ message: () => { throw { status: 422, message: "El parametro 'auto_capacidad' es obligatorio" }; } }),
    __metadata("design:type", Number)
], Automovil.prototype, "capacidad", void 0);
__decorate([
    Expose({ name: "auto_precio_diario" }),
    IsDefined({ message: () => { throw { status: 422, message: "El parametro 'auto_precio_diario' es obligatorio" }; } }),
    __metadata("design:type", Number)
], Automovil.prototype, "precio_diario", void 0);
