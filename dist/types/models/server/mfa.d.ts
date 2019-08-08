import { SFItem } from 'standard-file-js/lib/app/models/item';
export declare class SNMfa extends SFItem {
    constructor(json_obj: any);
    readonly content_type: string;
    doNotEncrypt(): boolean;
}
