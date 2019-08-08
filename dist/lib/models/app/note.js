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
var remove_1 = require("lodash/remove");
var item_1 = require("standard-file-js/lib/app/models/item");
var tag_1 = require("./tag");
var SNNote = /** @class */ (function (_super) {
    __extends(SNNote, _super);
    function SNNote(json_obj) {
        var _this = _super.call(this, json_obj) || this;
        if (!_this.text) {
            // Some external editors can't handle a null value for text.
            // Notes created on mobile with no text have a null value for it,
            // so we'll just set a default here.
            _this.text = '';
        }
        if (!_this.tags) {
            _this.tags = [];
        }
        return _this;
    }
    SNNote.prototype.mapContentToLocalProperties = function (content) {
        _super.prototype.mapContentToLocalProperties.call(this, content);
        this.title = content.title;
        this.text = content.text;
    };
    SNNote.prototype.structureParams = function () {
        var params = {
            title: this.title,
            text: this.text
        };
        var superParams = _super.prototype.structureParams.call(this);
        Object.assign(superParams, params);
        return superParams;
    };
    SNNote.prototype.addItemAsRelationship = function (item) {
        /*
        Legacy.
        Previously, note/tag relationships were bidirectional, however in some cases there
        may be broken links such that a note has references to a tag and not vice versa.
        Now, only tags contain references to notes. For old notes that may have references to tags,
        we want to transfer them over to the tag.
         */
        if (item.content_type == 'Tag') {
            item.addItemAsRelationship(this);
        }
        _super.prototype.addItemAsRelationship.call(this, item);
    };
    SNNote.prototype.setIsBeingReferencedBy = function (item) {
        _super.prototype.setIsBeingReferencedBy.call(this, item);
        this.clearSavedTagsString();
    };
    SNNote.prototype.setIsNoLongerBeingReferencedBy = function (item) {
        _super.prototype.setIsNoLongerBeingReferencedBy.call(this, item);
        this.clearSavedTagsString();
    };
    SNNote.prototype.isBeingRemovedLocally = function () {
        var _this = this;
        this.tags.forEach(function (tag) {
            remove_1.default(tag.notes, { uuid: _this.uuid });
        });
        _super.prototype.isBeingRemovedLocally.call(this);
    };
    SNNote.filterDummyNotes = function (notes) {
        var filtered = notes.filter(function (note) {
            return note.dummy == false || note.dummy == null;
        });
        return filtered;
    };
    SNNote.prototype.informReferencesOfUUIDChange = function (oldUUID, newUUID) {
        _super.prototype.informReferencesOfUUIDChange.call(this);
        for (var _i = 0, _a = this.tags; _i < _a.length; _i++) {
            var tag = _a[_i];
            remove_1.default(tag.notes, { uuid: oldUUID });
            tag.notes.push(this);
        }
    };
    SNNote.prototype.tagDidFinishSyncing = function (tag) {
        this.clearSavedTagsString();
    };
    SNNote.prototype.safeText = function () {
        return this.text || '';
    };
    SNNote.prototype.safeTitle = function () {
        return this.title || '';
    };
    Object.defineProperty(SNNote.prototype, "content_type", {
        get: function () {
            return 'Note';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SNNote.prototype, "displayName", {
        get: function () {
            return 'Note';
        },
        enumerable: true,
        configurable: true
    });
    SNNote.prototype.clearSavedTagsString = function () {
        this.savedTagsString = null;
    };
    SNNote.prototype.tagsString = function () {
        this.savedTagsString = tag_1.SNTag.arrayToDisplayString(this.tags);
        return this.savedTagsString;
    };
    return SNNote;
}(item_1.SFItem));
exports.SNNote = SNNote;
//# sourceMappingURL=note.js.map