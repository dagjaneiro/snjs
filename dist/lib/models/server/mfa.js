var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { SFItem } from 'standard-file-js/lib/app/models/item';
var SNMfa = /** @class */ (function (_super) {
    __extends(SNMfa, _super);
    function SNMfa(json_obj) {
        return _super.call(this, json_obj) || this;
    }
    Object.defineProperty(SNMfa.prototype, "content_type", {
        get: function () {
            return 'SF|MFA';
        },
        enumerable: true,
        configurable: true
    });
    SNMfa.prototype.doNotEncrypt = function () {
        return true;
    };
    return SNMfa;
}(SFItem));
export { SNMfa };
//# sourceMappingURL=mfa.js.map