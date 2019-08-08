import { SFItem } from 'standard-file-js/lib/app/models/item';

export class SNEncryptedStorage extends SFItem {
  storage: any;

  mapContentToLocalProperties(content) {
    super.mapContentToLocalProperties(content);
    this.storage = content.storage;
  }

  get content_type() {
    return 'SN|EncryptedStorage';
  }
}
