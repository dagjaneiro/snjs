import { SFItemData } from 'standard-file-js';
import { SFModelManager } from 'standard-file-js/lib/app/lib/modelManager';
import { SFSyncManager } from 'standard-file-js/lib/app/lib/syncManager';
import { ExtensionContentTypes } from '../types';
import HttpManager from './httpManager';
import LocalItemSync from './localItemSync';

export const RepoManifestContentType = 'SN|Repo';
export const ExtensionRepoContentType = 'SN|ExtensionRepo';

export interface IExtensionStorage {
  install(extension: SFItemData): SFItemData;
  isInstalled(extension: SFItemData): boolean;
  uninstall(extension: SFItemData): void;
}

interface RepoManifest {
  content_type: string;
  valid_until: string;
  packages: PackageManifest[];
}

interface PackageManifest {
  identifier: string;
  name: string;
  content_type: string;
  area: string;
  version: string;
  description: string;
  url: string;
  thumbnail_url: string;
  download_url: string;
  flags?: string[];
  valid_until: string;
  latest_url: string;
}

const download = async (url: string): Promise<any> =>
  new Promise((resolve, reject) =>
    HttpManager.get().getAbsolute(
      url,
      {},
      response => resolve(response),
      error => reject(error)
    )
  );

export default class RepoManager extends LocalItemSync {
  private packages: PackageManifest[] = [];

  constructor(
    private repo: SFItemData,
    modelManager: SFModelManager,
    syncManager: SFSyncManager,
    private extensionStorage?: IExtensionStorage
  ) {
    super(
      `repo-manager-${repo.uuid}`,
      Object.values(ExtensionContentTypes),
      modelManager,
      syncManager
    );
  }

  get uuid() {
    return this.repo.uuid;
  }

  get availablePackages() {
    return this.packages.filter(
      available =>
        !this.items.find(
          installed => installed.content.identifier === available.identifier
        )
    );
  }

  get installedPackages() {
    return this.items;
  }

  get cachedPackages() {
    return this.items.filter(installed => installed.content.local_url);
  }

  async updateAvailablePackages(url: string) {
    try {
      const response: RepoManifest = await download(url);
      if (response.content_type === RepoManifestContentType) {
        this.packages = response.packages;
      }
    } catch (e) {
      console.log('Failed to download repo manifest');
    }
  }

  // Try to install package locally
  async onItemAdded(item: SFItemData) {
    // Sanity check
    if (this.extensionStorage && item.content.local_url === null) {
      const installedItem = await this.extensionStorage.install(item);

      const model = this.modelManager.findItem(item.uuid);
      // tslint:disable-next-line:no-debugger
      debugger;
      model.content.local_url = installedItem.content.local_url;
      this.modelManager.setItemDirty(model);
      this.syncManager.sync();
    }
  }

  // async installPackage();

  // Manage local items
  itemForPackage(packageInfo: PackageManifest) {
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
}
