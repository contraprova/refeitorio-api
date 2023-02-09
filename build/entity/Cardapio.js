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
exports.Cardapio = void 0;
var typeorm_1 = require("typeorm");
var Prato_1 = require("./Prato");
var Cardapio = /** @class */ (function () {
    function Cardapio() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn('increment'),
        __metadata("design:type", Number)
    ], Cardapio.prototype, "id", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Date)
    ], Cardapio.prototype, "data", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Date)
    ], Cardapio.prototype, "updated_at", void 0);
    __decorate([
        typeorm_1.ManyToMany(function () { return Prato_1.Prato; }, function (prato) { return prato.cardapios; }),
        typeorm_1.JoinTable({
            name: "cardapioPrato",
            joinColumn: {
                name: "cardapio_id",
                referencedColumnName: "id"
            },
            inverseJoinColumn: {
                name: "prato_id",
                referencedColumnName: "id"
            }
        }),
        __metadata("design:type", Prato_1.Prato)
    ], Cardapio.prototype, "pratos", void 0);
    Cardapio = __decorate([
        typeorm_1.Entity("cardapio")
    ], Cardapio);
    return Cardapio;
}());
exports.Cardapio = Cardapio;
//# sourceMappingURL=Cardapio.js.map