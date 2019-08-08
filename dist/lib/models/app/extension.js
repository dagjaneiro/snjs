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
var merge_1 = require("lodash/merge");
var omit_1 = require("lodash/omit");
var item_1 = require("standard-file-js/lib/app/models/item");
var Action = /** @class */ (function () {
    function Action(json) {
        merge_1.default(this, json);
        this.running = false; // in case running=true was synced with server since model is uploaded nondiscriminatory
        this.error = false;
        if (this.lastExecuted) {
            // is string
            this.lastExecuted = new Date(this.lastExecuted);
        }
    }
    return Action;
}());
exports.Action = Action;
var SNExtension = /** @class */ (function (_super) {
    __extends(SNExtension, _super);
    function SNExtension(json) {
        var _this = _super.call(this, json) || this;
        if (json.actions) {
            _this.actions = json.actions.map(function (action) {
                return new Action(action);
            });
        }
        if (!_this.actions) {
            _this.actions = [];
        }
        return _this;
    }
    SNExtension.prototype.actionsWithContextForItem = function (item) {
        return this.actions.filter(function (action) {
            return action.context == item.content_type || action.context == 'Item';
        });
    };
    SNExtension.prototype.mapContentToLocalProperties = function (content) {
        _super.prototype.mapContentToLocalProperties.call(this, content);
        this.description = content.description;
        this.url = content.url;
        this.name = content.name;
        this.package_info = content.package_info;
        this.supported_types = content.supported_types;
        if (content.actions) {
            this.actions = content.actions.map(function (action) {
                return new Action(action);
            });
        }
    };
    Object.defineProperty(SNExtension.prototype, "content_type", {
        get: function () {
            return 'Extension';
        },
        enumerable: true,
        configurable: true
    });
    SNExtension.prototype.structureParams = function () {
        var params = {
            name: this.name,
            url: this.url,
            package_info: this.package_info,
            description: this.description,
            actions: this.actions.map(function (a) {
                return omit_1.default(a, ['subrows', 'subactions']);
            }),
            supported_types: this.supported_types
        };
        var superParams = _super.prototype.structureParams.call(this);
        Object.assign(superParams, params);
        return superParams;
    };
    return SNExtension;
}(item_1.SFItem));
exports.SNExtension = SNExtension;
//# sourceMappingURL=extension.js.map