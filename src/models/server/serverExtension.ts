import { SFItem } from 'standard-file-js/lib/app/models/item';

export class SNServerExtension extends SFItem {
  url: any;

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
