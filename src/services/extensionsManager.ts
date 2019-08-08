import HttpManager from './httpManager';
import { SFItemData } from 'standard-file-js';
import { SFModelManager } from 'standard-file-js/lib/app/lib/modelManager';
import { SFSyncManager } from 'standard-file-js/lib/app/lib/syncManager';
import LocalItemSync from './localItemSync';
import RepoManager, {
  ExtensionRepoContentType,
  IExtensionStorage
} from './repoManager';
import { Callback } from '../types';

interface InstallPackageData {
  name: string;
  content_type: string;
  identifier: string;
  valid_until: string;
  url: string;
  area: string;
}

interface ObserverCallback<T extends any[] = []> {
  id: number;
  callback: Callback<T>;
}
export default class ExtensionsManager extends LocalItemSync {
  private updateObservers: ObserverCallback[] = [];
  private repos: RepoManager[] = [];

  constructor(
    modelManager: SFModelManager,
    syncManager: SFSyncManager,
    private extensionStorage?: IExtensionStorage
  ) {
    super(
      'extensions-manager',
      [ExtensionRepoContentType],
      modelManager,
      syncManager
    );
  }

  get installedRepos() {
    return this.items;
  }

  async onItemAdded(item: SFItemData) {
    this.repos.push(
      new RepoManager(
        item,
        this.modelManager,
        this.syncManager,
        this.extensionStorage
      )
    );
  }

  async onItemDeleted(item: SFItemData) {
    const repo = this.repos.find(r => item.uuid === r.uuid);
    if (repo) {
      repo.dispose();
    }

    this.repos = this.repos.filter(r => {
      return r.uuid !== item.uuid;
    });
  }

  // Repo management
  addRepo(url: string) {
    const item = this.modelManager.createItem({
      content_type: ExtensionRepoContentType,
      content: { url }
    });

    this.modelManager.addItem(item);
    this.modelManager.setItemDirty(item);
  }

  uninstallRepo(repo: SFItemData) {
    const item = this.modelManager.findItem(repo.uuid);
    if (item) {
      this.modelManager.setItemToBeDeleted(item);
    } else {
      console.error('The item you are trying to delete cannot be found.');
    }
  }

  installPackageFromUrl(
    url: string,
    callback: (component: object | null, error?: any) => void
  ) {
    HttpManager.get().getAbsolute(
      url,
      {},
      response => {
        this.installPackage(response).then(component => {
          callback(component);
        });
        callback(response);
      },
      error => {
        console.log('Error installing from url', error);
        callback(null, error || {});
      }
    );
  }

  async installPackage(aPackage: any, repo?: any): Promise<SFItemData> {
    return new Promise((resolve, reject) => {
      const data = this.createComponentDataForPackage(aPackage, repo);
      const item = this.modelManager.createItem(data);
      this.modelManager.addItem(item);
      this.modelManager.setItemDirty(item);
      resolve(data);
    });
  }

  downloadPackageDetails(url: string, callback: Callback<[any, any?]>) {
    HttpManager.get().getAbsolute(
      url,
      {},
      response => {
        callback(response);
      },
      error => {
        console.log('Error downloading package details', error);
        callback(null, error || {});
      }
    );
  }

  // Manage local items
  itemForPackage(packageInfo: InstallPackageData) {
    const result = this.items.find(item => {
      if (!item.content.package_info) {
        if (!item.content.url) {
          return false;
        }
        // Legacy component without package_info, search by url or name
        // We also check if the item content url contains the substring that is packageInfo, since
        // newer URL formats remove extraneous query params from the end
        return (
          item.content.url === packageInfo.url ||
          item.content.url.includes(packageInfo.url) ||
          item.content.name === packageInfo.name
        );
      }
      return (
        item.content.package_info &&
        !item.deleted &&
        item.content.package_info.identifier === packageInfo.identifier
      );
    });
    return result;
  }

  itemForId(uuid: string) {
    return this.items.filter(item => {
      return item.uuid === uuid;
    })[0];
  }

  indexOfItem(item: SFItemData): number {
    for (const index in this.items) {
      if (this.items[index].uuid === item.uuid) {
        return Number(index);
      }
    }
    return -1;
  }

  removeItemFromItems(item: SFItemData) {
    this.items = this.items.filter(candidate => {
      return candidate.uuid !== item.uuid;
    });
  }

  allInstalled() {
    return this.items.filter(item => {
      return item.content_type !== ExtensionRepoContentType;
    });
  }

  // Observers
  addUpdateObserver(callback: Callback) {
    const observer = { id: Math.random(), callback };
    this.updateObservers.push(observer);
    return observer;
  }

  removeUpdateObserver(observer: ObserverCallback) {
    this.updateObservers.splice(this.updateObservers.indexOf(observer), 1);
  }

  notifyObserversOfUpdate() {
    for (const observer of this.updateObservers) {
      observer.callback();
    }
  }

  private createComponentDataForPackage(
    aPackage: InstallPackageData,
    repo?: any
  ) {
    return {
      content: {
        identifier: aPackage.identifier,
        hosted_url: aPackage.url,
        name: aPackage.name,
        url: aPackage.url,
        local_url: null,
        area: aPackage.area,
        package_info: aPackage,
        valid_until: aPackage.valid_until,
        references: repo
          ? [{ content_type: repo.content_type, uuid: repo.uuid }]
          : []
      },
      content_type: aPackage.content_type
    };
  }
}
