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
var component_1 = require("../app/component");
var SNTheme = /** @class */ (function (_super) {
    __extends(SNTheme, _super);
    function SNTheme(json_obj) {
        var _this = _super.call(this, json_obj) || this;
        _this.area = 'themes';
        return _this;
    }
    SNTheme.prototype.isLayerable = function () {
        return this.package_info && this.package_info.layerable;
    };
    Object.defineProperty(SNTheme.prototype, "content_type", {
        get: function () {
            return 'SN|Theme';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SNTheme.prototype, "displayName", {
        get: function () {
            return 'Theme';
        },
        enumerable: true,
        configurable: true
    });
    SNTheme.prototype.setMobileRules = function (rules) {
        this.setAppDataItem('mobileRules', rules);
    };
    SNTheme.prototype.getMobileRules = function () {
        return this.getAppDataItem('mobileRules') || { constants: {}, rules: {} };
    };
    // Same as getMobileRules but without default value
    SNTheme.prototype.hasMobileRules = function () {
        return this.getAppDataItem('mobileRules');
    };
    SNTheme.prototype.setNotAvailOnMobile = function (na) {
        this.setAppDataItem('notAvailableOnMobile', na);
    };
    SNTheme.prototype.getNotAvailOnMobile = function () {
        return this.getAppDataItem('notAvailableOnMobile');
    };
    /* We must not use .active because if you set that to true, it will also activate that theme on desktop/web */
    SNTheme.prototype.setMobileActive = function (active) {
        this.setAppDataItem('mobileActive', active);
    };
    SNTheme.prototype.isMobileActive = function () {
        return this.getAppDataItem('mobileActive');
    };
    return SNTheme;
}(component_1.SNComponent));
exports.SNTheme = SNTheme;
//# sourceMappingURL=theme.js.map