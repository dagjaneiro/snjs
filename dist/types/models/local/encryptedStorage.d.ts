import { SFItem } from 'standard-file-js/lib/app/models/item';
export declare class SNEncryptedStorage extends SFItem {
    storage: any;
    mapContentToLocalProperties(content: any): void;
    readonly content_type: string;
}
