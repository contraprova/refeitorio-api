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
exports.HandleDbPratos = void 0;
var typeorm_1 = require("typeorm");
var Prato_1 = require("../entity/Prato");
var PratosRepositories_1 = require("../repositories/PratosRepositories");
var HandleDbPratos = /** @class */ (function () {
    function HandleDbPratos() {
    }
    HandleDbPratos.prototype.inserePrato = function (_a, status) {
        var nome = _a.nome, lactose = _a.lactose, vegano = _a.vegano, gluten = _a.gluten, categoria_id = _a.categoria_id;
        return __awaiter(this, void 0, void 0, function () {
            var pratoRepositorio, pratoExistente, prato;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        pratoRepositorio = typeorm_1.getCustomRepository(PratosRepositories_1.PratoRepositories);
                        return [4 /*yield*/, pratoRepositorio.findOne({ nome: nome })];
                    case 1:
                        pratoExistente = _b.sent();
                        if (!nome) {
                            throw new Error("Informe o Prato");
                        }
                        if (!categoria_id) {
                            throw new Error("Informe a Categoria");
                        }
                        if (pratoExistente) {
                            throw new Error("Prato já cadastrado");
                        }
                        console.log(gluten);
                        prato = pratoRepositorio.create({
                            nome: nome,
                            lactose: lactose,
                            vegano: vegano,
                            gluten: gluten,
                            categoria_id: categoria_id,
                            status: status
                        });
                        return [4 /*yield*/, pratoRepositorio.save(prato)];
                    case 2:
                        _b.sent();
                        return [2 /*return*/, prato];
                }
            });
        });
    };
    HandleDbPratos.prototype.listaPrato = function (_a) {
        var nome = _a.nome;
        return __awaiter(this, void 0, void 0, function () {
            var pratoRepositorio, prato;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!nome) {
                            throw new Error("Informe o Prato");
                        }
                        pratoRepositorio = typeorm_1.getCustomRepository(PratosRepositories_1.PratoRepositories);
                        return [4 /*yield*/, pratoRepositorio.findOne({ nome: nome })];
                    case 1:
                        prato = _b.sent();
                        if (!prato || typeof (prato) == "undefined") {
                            throw new Error("Prato Inexistente");
                        }
                        return [2 /*return*/, prato];
                }
            });
        });
    };
    // Trazer todos os pratos caso não venha parametro na URL, caso venha, pegar os pratos da categoria.
    HandleDbPratos.prototype.listaTodosOsPratos = function (_a) {
        var categoria_id = _a.categoria_id;
        return __awaiter(this, void 0, void 0, function () {
            var pratoRepositorio, prato, prato;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        pratoRepositorio = typeorm_1.getCustomRepository(PratosRepositories_1.PratoRepositories);
                        if (!!categoria_id) return [3 /*break*/, 2];
                        return [4 /*yield*/, pratoRepositorio.createQueryBuilder('pratos')
                                .orderBy("pratos.nome", "ASC")
                                .addOrderBy("pratos.categoria_id", 'ASC')
                                .getMany()];
                    case 1:
                        prato = _b.sent();
                        return [2 /*return*/, prato];
                    case 2:
                        if (!categoria_id) return [3 /*break*/, 4];
                        return [4 /*yield*/, pratoRepositorio.createQueryBuilder('pratos')
                                .where('pratos.categoria_id = :id', { id: categoria_id })
                                .orderBy("pratos.nome", "ASC")
                                .getMany()];
                    case 3:
                        prato = _b.sent();
                        return [2 /*return*/, prato];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    HandleDbPratos.prototype.atualizaPrato = function (_a) {
        var nome = _a.nome, lactose = _a.lactose, vegano = _a.vegano, gluten = _a.gluten, categoria_id = _a.categoria_id, status = _a.status, id = _a.id;
        return __awaiter(this, void 0, void 0, function () {
            var pratoRepositorio, prato;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!id && !categoria_id && !status) {
                            throw new Error("Informe o Prato, Categoria ou Status");
                        }
                        pratoRepositorio = typeorm_1.getCustomRepository(PratosRepositories_1.PratoRepositories);
                        return [4 /*yield*/, pratoRepositorio.findOne({ id: id })];
                    case 1:
                        prato = _b.sent();
                        if (!prato || typeof (prato) == "undefined") {
                            throw new Error("Prato Inexistente");
                        }
                        if (!categoria_id) {
                            categoria_id = prato.categoria_id;
                        }
                        if (!nome) {
                            nome = prato.nome;
                        }
                        if (!lactose) {
                            lactose = prato.lactose;
                        }
                        if (!vegano) {
                            vegano = prato.vegano;
                        }
                        if (!gluten) {
                            gluten = prato.gluten;
                        }
                        if (typeof (status) == "undefined") {
                            status = prato.status;
                        }
                        prato.nome = nome;
                        prato.lactose = lactose;
                        prato.vegano = vegano;
                        prato.gluten = gluten;
                        prato.categoria_id = categoria_id;
                        prato.status = status;
                        return [4 /*yield*/, pratoRepositorio.save(prato)];
                    case 2:
                        _b.sent();
                        return [2 /*return*/, prato];
                }
            });
        });
    };
    HandleDbPratos.prototype.deletaPrato = function (_a) {
        var id = _a.id;
        return __awaiter(this, void 0, void 0, function () {
            var pratoRepositorio, deletaPrato;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!id) {
                            throw new Error("Informe o Prato para exclusão");
                        }
                        pratoRepositorio = typeorm_1.getCustomRepository(PratosRepositories_1.PratoRepositories);
                        if (!id) return [3 /*break*/, 2];
                        return [4 /*yield*/, pratoRepositorio.createQueryBuilder("Prato").delete().from(Prato_1.Prato)
                                .where("id = :id", { id: id }).execute()];
                    case 1:
                        deletaPrato = _b.sent();
                        _b.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    return HandleDbPratos;
}());
exports.HandleDbPratos = HandleDbPratos;
//# sourceMappingURL=PratoService.js.map