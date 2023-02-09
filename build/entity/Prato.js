"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Prato = void 0;
var typeorm_1 = require("typeorm");
var Cardapio_1 = require("./Cardapio");
var Categoria_1 = require("./Categoria");
var Prato = /** @class */ (function () {
    function Prato() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn('increment'),
        __metadata("design:type", Number)
    ], Prato.prototype, "id", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Prato.prototype, "nome", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Number)
    ], Prato.prototype, "categoria_id", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Boolean)
    ], Prato.prototype, "status", void 0);
    __decorate([
        typeorm_1.ManyToMany(function () { return Cardapio_1.Cardapio; }, function (cardapio) { return cardapio.pratos; }),
        __metadata("design:type", Cardapio_1.Cardapio)
    ], Prato.prototype, "cardapios", void 0);
    __decorate([
        typeorm_1.JoinColumn({ name: 'categoria_id' }),
        typeorm_1.ManyToOne(function () { return Categoria_1.Categoria; }, function (categoria) { return categoria.prato; }),
        __metadata("design:type", Array)
    ], Prato.prototype, "categoria", void 0);
    Prato = __decorate([
        typeorm_1.Entity("pratos")
    ], Prato);
    return Prato;
}());
exports.Prato = Prato;
