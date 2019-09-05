import { SFItem } from 'standard-file-js';

export class SNMfa extends SFItem {
  // eslint-disable-next-line no-useless-constructor
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
