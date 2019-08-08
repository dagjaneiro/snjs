import { SFItem } from 'standard-file-js/lib/app/models/item';
export declare class SNServerExtension extends SFItem {
    url: any;
    mapContentToLocalProperties(content: any): void;
    readonly content_type: string;
    doNotEncrypt(): boolean;
}
