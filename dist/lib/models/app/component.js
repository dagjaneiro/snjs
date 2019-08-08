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
var SNComponent = /** @class */ (function (_super) {
    __extends(SNComponent, _super);
    function SNComponent(json_obj) {
        var _this = this;
        // If making a copy of an existing component (usually during sign in if you have a component active in the session),
        // which may have window set, you may get a cross-origin exception since you'll be trying to copy the window. So we clear it here.
        json_obj.window = null;
        _this = _super.call(this, json_obj) || this;
        if (!_this.componentData) {
            _this.componentData = {};
        }
        if (!_this.disassociatedItemIds) {
            _this.disassociatedItemIds = [];
        }
        if (!_this.associatedItemIds) {
            _this.associatedItemIds = [];
        }
        return _this;
    }
    SNComponent.prototype.mapContentToLocalProperties = function (content) {
        _super.prototype.mapContentToLocalProperties.call(this, content);
        /* Legacy */
        // We don't want to set the url directly, as we'd like to phase it out.
        // If the content.url exists, we'll transfer it to legacy_url
        // We'll only need to set this if content.hosted_url is blank, otherwise, hosted_url is the url replacement.
        if (!content.hosted_url) {
            this.legacy_url = content.url;
        }
        /* New */
        this.local_url = content.local_url;
        this.hosted_url = content.hosted_url || content.url;
        this.offlineOnly = content.offlineOnly;
        if (content.valid_until) {
            this.valid_until = new Date(content.valid_until);
        }
        this.name = content.name;
        this.autoupdateDisabled = content.autoupdateDisabled;
        this.package_info = content.package_info;
        // the location in the view this component is located in. Valid values are currently tags-list, note-tags, and editor-stack`
        this.area = content.area;
        this.permissions = content.permissions;
        if (!this.permissions) {
            this.permissions = [];
        }
        this.active = content.active;
        // custom data that a component can store in itself
        this.componentData = content.componentData || {};
        // items that have requested a component to be disabled in its context
        this.disassociatedItemIds = content.disassociatedItemIds || [];
        // items that have requested a component to be enabled in its context
        this.associatedItemIds = content.associatedItemIds || [];
    };
    SNComponent.prototype.handleDeletedContent = function () {
        _super.prototype.handleDeletedContent.call(this);
        this.active = false;
    };
    SNComponent.prototype.structureParams = function () {
        var params = {
            legacy_url: this.legacy_url,
            hosted_url: this.hosted_url,
            local_url: this.local_url,
            valid_until: this.valid_until,
            offlineOnly: this.offlineOnly,
            name: this.name,
            area: this.area,
            package_info: this.package_info,
            permissions: this.permissions,
            active: this.active,
            autoupdateDisabled: this.autoupdateDisabled,
            componentData: this.componentData,
            disassociatedItemIds: this.disassociatedItemIds,
            associatedItemIds: this.associatedItemIds
        };
        var superParams = _super.prototype.structureParams.call(this);
        Object.assign(superParams, params);
        return superParams;
    };
    Object.defineProperty(SNComponent.prototype, "content_type", {
        get: function () {
            return 'SN|Component';
        },
        enumerable: true,
        configurable: true
    });
    SNComponent.prototype.isEditor = function () {
        return this.area == 'editor-editor';
    };
    SNComponent.prototype.isTheme = function () {
        return this.content_type == 'SN|Theme' || this.area == 'themes';
    };
    SNComponent.prototype.isDefaultEditor = function () {
        return this.getAppDataItem('defaultEditor') == true;
    };
    SNComponent.prototype.getAppDataItem = function (arg0) {
        throw new Error('Method not implemented.');
    };
    SNComponent.prototype.setLastSize = function (size) {
        this.setAppDataItem('lastSize', size);
    };
    SNComponent.prototype.setAppDataItem = function (arg0, size) {
        throw new Error('Method not implemented.');
    };
    SNComponent.prototype.getLastSize = function () {
        return this.getAppDataItem('lastSize');
    };
    SNComponent.prototype.acceptsThemes = function () {
        if (this.content.package_info &&
            'acceptsThemes' in this.content.package_info) {
            return this.content.package_info.acceptsThemes;
        }
        return true;
    };
    /*
      The key used to look up data that this component may have saved to an item.
      This key will be look up on the item, and not on itself.
     */
    SNComponent.prototype.getClientDataKey = function () {
        if (this.legacy_url) {
            return this.legacy_url;
        }
        else {
            return this.uuid;
        }
    };
    SNComponent.prototype.hasValidHostedUrl = function () {
        return this.hosted_url || this.legacy_url;
    };
    SNComponent.prototype.keysToIgnoreWhenCheckingContentEquality = function () {
        return ['active', 'disassociatedItemIds', 'associatedItemIds'].concat(_super.prototype.keysToIgnoreWhenCheckingContentEquality.call(this));
    };
    /*
      An associative component depends on being explicitly activated for a given item, compared to a dissaciative component,
      which is enabled by default in areas unrelated to a certain item.
     */
    SNComponent.associativeAreas = function () {
        return ['editor-editor'];
    };
    SNComponent.prototype.isAssociative = function () {
        return SNComponent.associativeAreas().includes(this.area);
    };
    SNComponent.prototype.associateWithItem = function (item) {
        this.associatedItemIds.push(item.uuid);
    };
    SNComponent.prototype.isExplicitlyEnabledForItem = function (item) {
        return this.associatedItemIds.indexOf(item.uuid) !== -1;
    };
    SNComponent.prototype.isExplicitlyDisabledForItem = function (item) {
        return this.disassociatedItemIds.indexOf(item.uuid) !== -1;
    };
    return SNComponent;
}(item_1.SFItem));
exports.SNComponent = SNComponent;
//# sourceMappingURL=component.js.map