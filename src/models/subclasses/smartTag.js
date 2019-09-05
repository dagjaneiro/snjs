import { SFPredicate } from 'standard-file-js';
import { SNTag } from '../app/tag';

export class SNSmartTag extends SNTag {
  constructor(json_ob) {
    super(json_ob);
    this.content_type = 'SN|SmartTag';
  }

  static systemSmartTags() {
    return [
      new SNSmartTag({
        uuid: SNSmartTag.SystemSmartTagIdAllNotes,
        dummy: true,
        content: {
          title: 'All notes',
          isSystemTag: true,
          isAllTag: true,
          predicate: SFPredicate.fromArray(['content_type', '=', 'Note'])
        }
      }),
      new SNSmartTag({
        uuid: SNSmartTag.SystemSmartTagIdArchivedNotes,
        dummy: true,
        content: {
          title: 'Archived',
          isSystemTag: true,
          isArchiveTag: true,
          predicate: SFPredicate.fromArray(['archived', '=', true])
        }
      }),
      new SNSmartTag({
        uuid: SNSmartTag.SystemSmartTagIdTrashedNotes,
        dummy: true,
        content: {
          title: 'Trash',
          isSystemTag: true,
          isTrashTag: true,
          predicate: SFPredicate.fromArray(['content.trashed', '=', true])
        }
      })
    ];
  }
}

SNSmartTag.SystemSmartTagIdAllNotes = 'all-notes';
SNSmartTag.SystemSmartTagIdArchivedNotes = 'archived-notes';
SNSmartTag.SystemSmartTagIdTrashedNotes = 'trashed-notes';
