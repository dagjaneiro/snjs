import { SFHttpManager } from 'standard-file-js';
import LocalItemSync from './localItemSync';
import RepoManager, { ExtensionRepoContentType } from './repoManager';
const HttpManager = new SFHttpManager();

export default class ExtensionsManager extends LocalItemSync {
  constructor(modelManager, syncManager, extensionStorage) {
    super(
      'extensions-manager',
      [ExtensionRepoContentType],
      modelManager,
      syncManager
    );

    this.updateObservers = [];
    this.repos = [];
  }

  get installedRepos() {
    return this.items;
  }

  async onItemAdded(item) {
    this.repos.push(
      new RepoManager(
        item,
        this.modelManager,
        this.syncManager,
        this.extensionStorage
      )
    );
  }

  async onItemDeleted(item) {
    const repo = this.repos.find(r => item.uuid === r.uuid);
    if (repo) {
      repo.dispose();
    }

    this.repos = this.repos.filter(r => {
      return r.uuid !== item.uuid;
    });
  }

  // Repo management
  addRepo(url) {
    const item = this.modelManager.createItem({
      content_type: ExtensionRepoContentType,
      content: { url }
    });

    this.modelManager.addItem(item);
    this.modelManager.setItemDirty(item);
  }

  uninstallRepo(repo) {
    const item = this.modelManager.findItem(repo.uuid);
    if (item) {
      this.modelManager.setItemToBeDeleted(item);
    } else {
      console.error('The item you are trying to delete cannot be found.');
    }
  }

  installPackageFromUrl(url, callback) {
    HttpManager.getAbsolute(
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

  async installPackage(aPackage, repo) {
    return new Promise((resolve, reject) => {
      const data = this.createComponentDataForPackage(aPackage, repo);
      const item = this.modelManager.createItem(data);
      this.modelManager.addItem(item);
      this.modelManager.setItemDirty(item);
      resolve(data);
    });
  }

  downloadPackageDetails(url, callback) {
    HttpManager.getAbsolute(
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
  itemForPackage(packageInfo) {
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

  itemForId(uuid) {
    return this.items.filter(item => {
      return item.uuid === uuid;
    })[0];
  }

  indexOfItem(item) {
    for (const index in this.items) {
      if (this.items[index].uuid === item.uuid) {
        return Number(index);
      }
    }
    return -1;
  }

  removeItemFromItems(item) {
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
  addUpdateObserver(callback) {
    const observer = { id: Math.random(), callback };
    this.updateObservers.push(observer);
    return observer;
  }

  removeUpdateObserver(observer) {
    this.updateObservers.splice(this.updateObservers.indexOf(observer), 1);
  }

  notifyObserversOfUpdate() {
    for (const observer of this.updateObservers) {
      observer.callback();
    }
  }

  createComponentDataForPackage(aPackage, repo) {
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
