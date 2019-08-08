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
var map_1 = require("lodash/map");
var find_1 = require("lodash/find");
var pull_1 = require("lodash/pull");
var remove_1 = require("lodash/remove");
var item_1 = require("standard-file-js/lib/app/models/item");
var SNEditor = /** @class */ (function (_super) {
    __extends(SNEditor, _super);
    function SNEditor(json_obj) {
        var _this = _super.call(this, json_obj) || this;
        if (!_this.notes) {
            _this.notes = [];
        }
        if (!_this.data) {
            _this.data = {};
        }
        return _this;
    }
    SNEditor.prototype.mapContentToLocalProperties = function (content) {
        _super.prototype.mapContentToLocalProperties.call(this, content);
        this.url = content.url;
        this.name = content.name;
        this.data = content.data || {};
        this.default = content.default;
        this.systemEditor = content.systemEditor;
    };
    SNEditor.prototype.structureParams = function () {
        var params = {
            url: this.url,
            name: this.name,
            data: this.data,
            default: this.default,
            systemEditor: this.systemEditor
        };
        var superParams = _super.prototype.structureParams.call(this);
        Object.assign(superParams, params);
        return superParams;
    };
    SNEditor.prototype.referenceParams = function () {
        var references = map_1.default(this.notes, function (note) {
            return { uuid: note.uuid, content_type: note.content_type };
        });
        return references;
    };
    SNEditor.prototype.addItemAsRelationship = function (item) {
        if (item.content_type == 'Note') {
            if (!find_1.default(this.notes, item)) {
                this.notes.push(item);
            }
        }
        _super.prototype.addItemAsRelationship.call(this, item);
    };
    SNEditor.prototype.removeItemAsRelationship = function (item) {
        if (item.content_type == 'Note') {
            pull_1.default(this.notes, item);
        }
        _super.prototype.removeItemAsRelationship.call(this, item);
    };
    SNEditor.prototype.removeAndDirtyAllRelationships = function () {
        _super.prototype.removeAndDirtyAllRelationships.call(this);
        this.notes = [];
    };
    SNEditor.prototype.removeReferencesNotPresentIn = function (references) {
        var _this = this;
        _super.prototype.removeReferencesNotPresentIn.call(this, references);
        var uuids = references.map(function (ref) {
            return ref.uuid;
        });
        this.notes.forEach(function (note) {
            if (!uuids.includes(note.uuid)) {
                remove_1.default(_this.notes, { uuid: note.uuid });
            }
        });
    };
    SNEditor.prototype.potentialItemOfInterestHasChangedItsUUID = function (newItem, oldUUID, newUUID) {
        if (newItem.content_type === 'Note' &&
            find_1.default(this.notes, { uuid: oldUUID })) {
            remove_1.default(this.notes, { uuid: oldUUID });
            this.notes.push(newItem);
        }
    };
    Object.defineProperty(SNEditor.prototype, "content_type", {
        get: function () {
            return 'SN|Editor';
        },
        enumerable: true,
        configurable: true
    });
    SNEditor.prototype.setData = function (key, value) {
        var dataHasChanged = JSON.stringify(this.data[key]) !== JSON.stringify(value);
        if (dataHasChanged) {
            this.data[key] = value;
            return true;
        }
        return false;
    };
    SNEditor.prototype.dataForKey = function (key) {
        return this.data[key] || {};
    };
    return SNEditor;
}(item_1.SFItem));
exports.SNEditor = SNEditor;
//# sourceMappingURL=editor.js.map