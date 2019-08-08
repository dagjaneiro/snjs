import { SFItem } from 'standard-file-js/lib/app/models/item';
export declare class Action {
    running: boolean;
    error: boolean;
    lastExecuted: any;
    constructor(json: any);
}
export declare class SNExtension extends SFItem {
    actions: any;
    description: any;
    url: any;
    name: any;
    package_info: any;
    supported_types: any;
    constructor(json: any);
    actionsWithContextForItem(item: any): any;
    mapContentToLocalProperties(content: any): void;
    readonly content_type: string;
    structureParams(): any;
}
