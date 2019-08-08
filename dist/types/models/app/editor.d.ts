import { SFItem } from 'standard-file-js/lib/app/models/item';
export declare class SNEditor extends SFItem {
    notes: any;
    data: any;
    url: any;
    name: any;
    default: any;
    systemEditor: any;
    constructor(json_obj: any);
    mapContentToLocalProperties(content: any): void;
    structureParams(): any;
    referenceParams(): {
        uuid: any;
        content_type: any;
    }[];
    addItemAsRelationship(item: any): void;
    removeItemAsRelationship(item: any): void;
    removeAndDirtyAllRelationships(): void;
    removeReferencesNotPresentIn(references: any): void;
    potentialItemOfInterestHasChangedItsUUID(newItem: any, oldUUID: any, newUUID: any): void;
    readonly content_type: string;
    setData(key: any, value: any): boolean;
    dataForKey(key: any): any;
}
