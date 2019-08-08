declare module 'standard-file-js' {
  type SFItemReference = {
    uuid: string;
    content_type: string;
  };

  export type SFItemData = {
    content: {
      references?: SFItemReference[];
      appData?: {
        [key: string]: any;
      };
    } & {
      [key: string]: any;
    };
    content_type: string;
    referencingObjects?: SFItemReference[];
    uuid?: string;
    deleted?: boolean;
    enc_item_key?: string;
    auth_hash?: string;
    auth_params?: any;
    dirtiedDate?: Date;
    created_at?: Date;
    updated_at?: Date;
    dirty?: boolean;
    dirtyCount?: number;
    isMetadataUpdate?: boolean;
    readonly pinned?: boolean;
    readonly archived?: boolean;
    readonly locked?: boolean;
    readonly displayName?: string;
    client_updated_at?: Date;
  };

  type ModelManagerCallback = (
    allRelevantItems: SFItemData[],
    validItems: SFItemData[],
    deletedItems: SFItemData[],
    source: string,
    sourceKey: string
  ) => void;
}
