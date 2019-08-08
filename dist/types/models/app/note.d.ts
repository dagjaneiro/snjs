import { SFItem } from 'standard-file-js/lib/app/models/item';
export declare class SNNote extends SFItem {
    text: any;
    tags: any;
    title: any;
    savedTagsString: any;
    uuid: any;
    constructor(json_obj: any);
    mapContentToLocalProperties(content: any): void;
    structureParams(): any;
    addItemAsRelationship(item: any): void;
    setIsBeingReferencedBy(item: any): void;
    setIsNoLongerBeingReferencedBy(item: any): void;
    isBeingRemovedLocally(): void;
    static filterDummyNotes(notes: any): any;
    informReferencesOfUUIDChange(oldUUID: any, newUUID: any): void;
    tagDidFinishSyncing(tag: any): void;
    safeText(): any;
    safeTitle(): any;
    readonly content_type: string;
    readonly displayName: string;
    clearSavedTagsString(): void;
    tagsString(): any;
}
