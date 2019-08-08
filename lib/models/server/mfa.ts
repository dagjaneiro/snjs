import { SFItem } from 'standard-file-js/lib/app/models/item';

export class SNMfa extends SFItem {
  constructor(json_obj) {
    super(json_obj);
  }

  get content_type() {
    return 'SF|MFA';
  }

  doNotEncrypt() {
    return true;
  }
}
