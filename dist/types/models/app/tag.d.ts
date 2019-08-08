import { SFItem } from 'standard-file-js/lib/app/models/item';
export declare class SNTag extends SFItem {
    content_type: any;
    notes: any;
    title: any;
    uuid: any;
    content: any;
    constructor(json_obj: any);
    mapContentToLocalProperties(content: any): void;
    structureParams(): any;
    addItemAsRelationship(item: any): void;
    removeItemAsRelationship(item: any): void;
    updateLocalRelationships(): void;
    isBeingRemovedLocally(): void;
    informReferencesOfUUIDChange(oldUUID: any, newUUID: any): void;
    didFinishSyncing(): void;
    isSmartTag(): boolean;
    readonly displayName: string;
    static arrayToDisplayString(tags: any): any;
}
