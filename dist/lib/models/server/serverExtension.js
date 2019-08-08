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
var SNServerExtension = /** @class */ (function (_super) {
    __extends(SNServerExtension, _super);
    function SNServerExtension() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SNServerExtension.prototype.mapContentToLocalProperties = function (content) {
        _super.prototype.mapContentToLocalProperties.call(this, content);
        this.url = content.url;
    };
    Object.defineProperty(SNServerExtension.prototype, "content_type", {
        get: function () {
            return 'SF|Extension';
        },
        enumerable: true,
        configurable: true
    });
    SNServerExtension.prototype.doNotEncrypt = function () {
        return true;
    };
    return SNServerExtension;
}(SFItem));
export { SNServerExtension };
//# sourceMappingURL=serverExtension.js.map