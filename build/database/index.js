"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var typeorm_1 = require("typeorm");
typeorm_1.createConnection();
if (!typeorm_1.createConnection()) {
    console.log("Conexao com problemas.");
}
//# sourceMappingURL=index.js.map