import { SFItem } from 'standard-file-js';

export class SNServerExtension extends SFItem {
  mapContentToLocalProperties(content) {
    super.mapContentToLocalProperties(content);
    this.url = content.url;
  }

  get content_type() {
    return 'SF|Extension';
  }

  doNotEncrypt() {
    return true;
  }
}
