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
import { SFPredicate } from 'standard-file-js/lib/app/models/predicate';
import { SNTag } from '../app/tag';
var SNSmartTag = /** @class */ (function (_super) {
    __extends(SNSmartTag, _super);
    function SNSmartTag(json_ob) {
        var _this = _super.call(this, json_ob) || this;
        _this.content_type = 'SN|SmartTag';
        return _this;
    }
    SNSmartTag.systemSmartTags = function () {
        return [
            new SNSmartTag({
                uuid: SNSmartTag.SystemSmartTagIdAllNotes,
                dummy: true,
                content: {
                    title: 'All notes',
                    isSystemTag: true,
                    isAllTag: true,
                    predicate: new SFPredicate.fromArray(['content_type', '=', 'Note'])
                }
            }),
            new SNSmartTag({
                uuid: SNSmartTag.SystemSmartTagIdArchivedNotes,
                dummy: true,
                content: {
                    title: 'Archived',
                    isSystemTag: true,
                    isArchiveTag: true,
                    predicate: new SFPredicate.fromArray(['archived', '=', true])
                }
            }),
            new SNSmartTag({
                uuid: SNSmartTag.SystemSmartTagIdTrashedNotes,
                dummy: true,
                content: {
                    title: 'Trash',
                    isSystemTag: true,
                    isTrashTag: true,
                    predicate: new SFPredicate.fromArray(['content.trashed', '=', true])
                }
            })
        ];
    };
    SNSmartTag.SystemSmartTagIdAllNotes = 'all-notes';
    SNSmartTag.SystemSmartTagIdArchivedNotes = 'archived-notes';
    SNSmartTag.SystemSmartTagIdTrashedNotes = 'trashed-notes';
    return SNSmartTag;
}(SNTag));
export { SNSmartTag };
//# sourceMappingURL=smartTag.js.map