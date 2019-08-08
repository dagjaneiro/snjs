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
import _ from 'lodash';
import { SFItem } from 'standard-file-js/lib/app/models/item';
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
            if (!_.find(this.notes, { uuid: item.uuid })) {
                this.notes.push(item);
                item.tags.push(this);
            }
        }
        _super.prototype.addItemAsRelationship.call(this, item);
    };
    SNTag.prototype.removeItemAsRelationship = function (item) {
        if (item.content_type == 'Note') {
            _.remove(this.notes, { uuid: item.uuid });
            _.remove(item.tags, { uuid: this.uuid });
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
                _.remove(note.tags, { uuid: _this.uuid });
                _.remove(_this.notes, { uuid: note.uuid });
                note.setIsNoLongerBeingReferencedBy(_this);
            }
        });
    };
    SNTag.prototype.isBeingRemovedLocally = function () {
        var _this = this;
        this.notes.forEach(function (note) {
            _.remove(note.tags, { uuid: _this.uuid });
            note.setIsNoLongerBeingReferencedBy(_this);
        });
        this.notes.length = 0;
        _super.prototype.isBeingRemovedLocally.call(this);
    };
    SNTag.prototype.informReferencesOfUUIDChange = function (oldUUID, newUUID) {
        for (var _i = 0, _a = this.notes; _i < _a.length; _i++) {
            var note = _a[_i];
            _.remove(note.tags, { uuid: oldUUID });
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
}(SFItem));
export { SNTag };
//# sourceMappingURL=tag.js.map