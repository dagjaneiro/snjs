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
var find_1 = require("lodash/find");
var remove_1 = require("lodash/remove");
var item_1 = require("standard-file-js/lib/app/models/item");
var SNTag = /** @class */ (function (_super) {
    __extends(SNTag, _super);
    function SNTag(json_obj) {
        var _this = _super.call(this, json_obj) || this;
        if (!_this.content_type) {
            _this.content_type = 'Tag';
        }
        if (!_this.notes) {
            _this.notes = [];
        }
        return _this;
    }
    SNTag.prototype.mapContentToLocalProperties = function (content) {
        _super.prototype.mapContentToLocalProperties.call(this, content);
        this.title = content.title;
    };
    SNTag.prototype.structureParams = function () {
        var params = {
            title: this.title
        };
        var superParams = _super.prototype.structureParams.call(this);
        Object.assign(superParams, params);
        return superParams;
    };
    SNTag.prototype.addItemAsRelationship = function (item) {
        if (item.content_type == 'Note') {
            if (!find_1.default(this.notes, { uuid: item.uuid })) {
                this.notes.push(item);
                item.tags.push(this);
            }
        }
        _super.prototype.addItemAsRelationship.call(this, item);
    };
    SNTag.prototype.removeItemAsRelationship = function (item) {
        if (item.content_type == 'Note') {
            remove_1.default(this.notes, { uuid: item.uuid });
            remove_1.default(item.tags, { uuid: this.uuid });
        }
        _super.prototype.removeItemAsRelationship.call(this, item);
    };
    SNTag.prototype.updateLocalRelationships = function () {
        var _this = this;
        var references = this.content.references;
        var uuids = references.map(function (ref) {
            return ref.uuid;
        });
        this.notes.slice().forEach(function (note) {
            if (!uuids.includes(note.uuid)) {
                remove_1.default(note.tags, { uuid: _this.uuid });
                remove_1.default(_this.notes, { uuid: note.uuid });
                note.setIsNoLongerBeingReferencedBy(_this);
            }
        });
    };
    SNTag.prototype.isBeingRemovedLocally = function () {
        var _this = this;
        this.notes.forEach(function (note) {
            remove_1.default(note.tags, { uuid: _this.uuid });
            note.setIsNoLongerBeingReferencedBy(_this);
        });
        this.notes.length = 0;
        _super.prototype.isBeingRemovedLocally.call(this);
    };
    SNTag.prototype.informReferencesOfUUIDChange = function (oldUUID, newUUID) {
        for (var _i = 0, _a = this.notes; _i < _a.length; _i++) {
            var note = _a[_i];
            remove_1.default(note.tags, { uuid: oldUUID });
            note.tags.push(this);
        }
    };
    SNTag.prototype.didFinishSyncing = function () {
        for (var _i = 0, _a = this.notes; _i < _a.length; _i++) {
            var note = _a[_i];
            note.tagDidFinishSyncing(this);
        }
    };
    SNTag.prototype.isSmartTag = function () {
        return this.content_type == 'SN|SmartTag';
    };
    Object.defineProperty(SNTag.prototype, "displayName", {
        get: function () {
            return 'Tag';
        },
        enumerable: true,
        configurable: true
    });
    SNTag.arrayToDisplayString = function (tags) {
        return tags
            .sort(function (a, b) {
            return a.title > b.title;
        })
            .map(function (tag, i) {
            return '#' + tag.title;
        })
            .join(' ');
    };
    return SNTag;
}(item_1.SFItem));
exports.SNTag = SNTag;
//# sourceMappingURL=tag.js.map