"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HandleDbCardapioPrato = void 0;
var typeorm_1 = require("typeorm");
var CardapioPrato_1 = require("../entity/CardapioPrato");
var CardapioPratoRepositories_1 = require("../repositories/CardapioPratoRepositories");
var CardapioRepositories_1 = require("../repositories/CardapioRepositories");
var CategoriasRepositories_1 = require("../repositories/CategoriasRepositories");
var CardapioService_1 = require("../services/CardapioService");
var moment = require('moment-timezone');
var dataAtual = moment().tz('America/Sao_Paulo').format('YYYY-MM-DD');
var HandleDbCardapioPrato = /** @class */ (function () {
    function HandleDbCardapioPrato() {
    }
    HandleDbCardapioPrato.prototype.insereCardapioPrato = function (_a) {
        var pratos = _a.pratos;
        return __awaiter(this, void 0, void 0, function () {
            var cardapioRepositorio, cardapioPratoRepositorio, cardapioDia, loop, handleDbCardapio, cardapioDia_1, cardapioCriado_1, loop;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        cardapioRepositorio = typeorm_1.getCustomRepository(CardapioRepositories_1.CardapioRepositories);
                        cardapioPratoRepositorio = typeorm_1.getCustomRepository(CardapioPratoRepositories_1.CardapioPratoRepositories);
                        return [4 /*yield*/, cardapioRepositorio.find({ where: { data: typeorm_1.MoreThanOrEqual(dataAtual)
                                }
                            })];
                    case 1:
                        cardapioDia = _b.sent();
                        if (!(cardapioDia.length > 0)) return [3 /*break*/, 2];
                        loop = Promise.resolve(pratos.id.forEach(function (element) { return __awaiter(_this, void 0, void 0, function () {
                            var cardapioPrato;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, cardapioPratoRepositorio.create({ prato_id: element, cardapio_id: cardapioDia[0].id })];
                                    case 1:
                                        cardapioPrato = _a.sent();
                                        return [4 /*yield*/, cardapioPratoRepositorio.save(cardapioPrato)];
                                    case 2:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); }));
                        return [2 /*return*/, { "Mensagem": "Cardapio Criado - Condicional 1 " + cardapioDia[0].id }];
                    case 2:
                        handleDbCardapio = new CardapioService_1.HandleDbCardapios();
                        return [4 /*yield*/, handleDbCardapio.insereCardapio()];
                    case 3:
                        cardapioDia_1 = _b.sent();
                        return [4 /*yield*/, cardapioRepositorio.find({ where: { data: typeorm_1.MoreThanOrEqual(dataAtual)
                                }
                            })];
                    case 4:
                        cardapioCriado_1 = _b.sent();
                        loop = Promise.resolve(pratos.id.forEach(function (element) { return __awaiter(_this, void 0, void 0, function () {
                            var cardapioPrato;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, cardapioPratoRepositorio.create({ prato_id: element, cardapio_id: cardapioCriado_1[0].id })];
                                    case 1:
                                        cardapioPrato = _a.sent();
                                        return [4 /*yield*/, cardapioPratoRepositorio.save(cardapioPrato)];
                                    case 2:
                                        _a.sent();
                                        return [2 /*return*/, cardapioPrato];
                                }
                            });
                        }); }));
                        return [2 /*return*/, { "Mensagem": "Cardapio Criado - Condicional 2 " + cardapioCriado_1[0].id }];
                }
            });
        });
    };
    HandleDbCardapioPrato.prototype.deletaPratoCardapio = function (_a) {
        var cardapio_id = _a.cardapio_id;
        return __awaiter(this, void 0, void 0, function () {
            var cardapioPratoRepositorio, deletaPratoCardapio;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!cardapio_id) {
                            throw new Error("Informe o cardápio");
                        }
                        cardapioPratoRepositorio = typeorm_1.getCustomRepository(CardapioPratoRepositories_1.CardapioPratoRepositories);
                        return [4 /*yield*/, cardapioPratoRepositorio.createQueryBuilder("cardapioPrato").delete().from(CardapioPrato_1.CardapioPrato)
                                .where("cardapio_id = :cardapio_id", { cardapio_id: cardapio_id }).execute()];
                    case 1:
                        deletaPratoCardapio = _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    HandleDbCardapioPrato.prototype.listaCardapioDia = function () {
        return __awaiter(this, void 0, void 0, function () {
            var categoriaRepositorio, cardapio;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        categoriaRepositorio = typeorm_1.getCustomRepository(CategoriasRepositories_1.CategoriaRepositories);
                        return [4 /*yield*/, categoriaRepositorio.createQueryBuilder('categoria')
                                .innerJoinAndSelect('categoria.prato', 'prato')
                                .innerJoinAndSelect('prato.cardapios', 'cardapio')
                                .where('cardapio.data >= :data', { data: dataAtual })
                                .orderBy('categoria.nome', 'ASC')
                                .getMany()];
                    case 1:
                        cardapio = _a.sent();
                        return [2 /*return*/, cardapio];
                }
            });
        });
    };
    return HandleDbCardapioPrato;
}());
exports.HandleDbCardapioPrato = HandleDbCardapioPrato;
//# sourceMappingURL=CardapioPratoService.js.map