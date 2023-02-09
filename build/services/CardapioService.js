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
exports.HandleDbCardapios = void 0;
var typeorm_1 = require("typeorm");
var CardapioPratoRepositories_1 = require("../repositories/CardapioPratoRepositories");
var CardapioRepositories_1 = require("../repositories/CardapioRepositories");
var CardapioPratoService_1 = require("../services/CardapioPratoService");
var moment = require('moment-timezone');
var HandleDbCardapios = /** @class */ (function () {
    function HandleDbCardapios() {
    }
    HandleDbCardapios.prototype.insereCardapio = function () {
        return __awaiter(this, void 0, void 0, function () {
            var cardapioRepositorio, cardapioDia, dataAtual, cardapio;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        cardapioRepositorio = typeorm_1.getCustomRepository(CardapioRepositories_1.CardapioRepositories);
                        return [4 /*yield*/, cardapioRepositorio.find()];
                    case 1:
                        cardapioDia = _a.sent();
                        if (!cardapioDia) {
                            throw new Error("A data de hoje já possui um cardapio cadastrado");
                        }
                        dataAtual = moment().tz('America/Sao_Paulo').format('YYYY/MM/DD H:mm:ss');
                        return [4 /*yield*/, cardapioRepositorio.create({ data: dataAtual })];
                    case 2:
                        cardapio = _a.sent();
                        return [4 /*yield*/, cardapioRepositorio.save(cardapio)];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, cardapio];
                }
            });
        });
    };
    HandleDbCardapios.prototype.deletaCardapio = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var cardapioPratoRepositorio, cardapio, deletaCardapio;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("Dentro do Cardapio Service: " + id);
                        cardapioPratoRepositorio = typeorm_1.getCustomRepository(CardapioPratoRepositories_1.CardapioPratoRepositories);
                        return [4 /*yield*/, cardapioPratoRepositorio.find({ cardapio_id: id })];
                    case 1:
                        cardapio = _a.sent();
                        if (!(cardapio.length <= 0)) return [3 /*break*/, 2];
                        throw new Error("O cardápio selecionado não existe");
                    case 2: return [4 /*yield*/, cardapioPratoRepositorio.delete({ cardapio_id: id })];
                    case 3:
                        deletaCardapio = _a.sent();
                        return [2 /*return*/, "Cardapio Deletado"];
                }
            });
        });
    };
    HandleDbCardapios.prototype.atualizaCardapio = function (_a) {
        var pratos = _a.pratos, id = _a.id;
        return __awaiter(this, void 0, void 0, function () {
            var cardapioPrato, cardapioPratoRepositorio, deletaCardapio, atualizaCardapio;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        cardapioPrato = new CardapioPratoService_1.HandleDbCardapioPrato();
                        cardapioPratoRepositorio = typeorm_1.getCustomRepository(CardapioPratoRepositories_1.CardapioPratoRepositories);
                        return [4 /*yield*/, cardapioPratoRepositorio.delete({ cardapio_id: id })];
                    case 1:
                        deletaCardapio = _b.sent();
                        console.log("ID Dentro do AtualizaCardapio: " + id);
                        return [4 /*yield*/, cardapioPrato.insereCardapioPrato({ pratos: pratos })];
                    case 2:
                        atualizaCardapio = _b.sent();
                        console.log("Pratos Dentro do AtualizaCardapio: " + pratos);
                        return [2 /*return*/];
                }
            });
        });
    };
    return HandleDbCardapios;
}());
exports.HandleDbCardapios = HandleDbCardapios;
//# sourceMappingURL=CardapioService.js.map