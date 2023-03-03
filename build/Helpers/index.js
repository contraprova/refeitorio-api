"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Helpers = void 0;
var Helpers = /** @class */ (function () {
    function Helpers() {
    }
    Helpers.prototype.handleTrueFalse = function (reqParam) {
        if (typeof (reqParam) !== 'undefined') {
            if (reqParam == 'false' || reqParam == false || reqParam == 0) {
                reqParam = 0;
            }
            else if (reqParam == 'true' || reqParam == true || reqParam == 1) {
                reqParam = 1;
            }
        }
        return reqParam;
    };
    return Helpers;
}());
exports.Helpers = Helpers;
//# sourceMappingURL=index.js.map