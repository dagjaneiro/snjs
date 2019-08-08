import { SNNote } from './models/app/note';
import { SNTag } from './models/app/tag';
import { SNSmartTag } from './models/subclasses/smartTag';
import { SNMfa } from './models/server/mfa';
import { SNServerExtension } from './models/server/serverExtension';
import { SNComponent } from './models/app/component';
import { SNEditor } from './models/app/editor';
import { SNExtension } from './models/app/extension';
import { SNTheme } from './models/subclasses/theme';
import { SNEncryptedStorage } from './models/local/encryptedStorage';
import { SNComponentManager } from './services/componentManager';

if (typeof window !== 'undefined' && window !== null) {
  // window is for some reason defined in React Native, but throws an exception when you try to set to it

  const globalScope: any = window;
  try {
    globalScope.SNNote = SNNote;
    globalScope.SNTag = SNTag;
    globalScope.SNSmartTag = SNSmartTag;
    globalScope.SNMfa = SNMfa;
    globalScope.SNServerExtension = SNServerExtension;
    globalScope.SNComponent = SNComponent;
    globalScope.SNEditor = SNEditor;
    globalScope.SNExtension = SNExtension;
    globalScope.SNTheme = SNTheme;
    globalScope.SNEncryptedStorage = SNEncryptedStorage;
    globalScope.SNComponentManager = SNComponentManager;
  } catch (e) {
    console.log('Exception while exporting snjs window variables', e);
  }
}
