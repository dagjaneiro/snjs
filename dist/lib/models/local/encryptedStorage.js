"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var item_1 = require("standard-file-js/lib/app/models/item");
var SNEncryptedStorage = /** @class */ (function (_super) {
    __extends(SNEncryptedStorage, _super);
    function SNEncryptedStorage() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SNEncryptedStorage.prototype.mapContentToLocalProperties = function (content) {
        _super.prototype.mapContentToLocalProperties.call(this, content);
        this.storage = content.storage;
    };
    Object.defineProperty(SNEncryptedStorage.prototype, "content_type", {
        get: function () {
            return 'SN|EncryptedStorage';
        },
        enumerable: true,
        configurable: true
    });
    return SNEncryptedStorage;
}(item_1.SFItem));
exports.SNEncryptedStorage = SNEncryptedStorage;
//# sourceMappingURL=encryptedStorage.js.map