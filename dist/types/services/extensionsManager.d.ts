import { SFItemData } from 'standard-file-js';
import { SFModelManager } from 'standard-file-js/lib/app/lib/modelManager';
import { SFSyncManager } from 'standard-file-js/lib/app/lib/syncManager';
import LocalItemSync from './localItemSync';
import { IExtensionStorage } from './repoManager';
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
    private extensionStorage?;
    private updateObservers;
    private repos;
    constructor(modelManager: SFModelManager, syncManager: SFSyncManager, extensionStorage?: IExtensionStorage | undefined);
    readonly installedRepos: SFItemData[];
    onItemAdded(item: SFItemData): Promise<void>;
    onItemDeleted(item: SFItemData): Promise<void>;
    addRepo(url: string): void;
    uninstallRepo(repo: SFItemData): void;
    installPackageFromUrl(url: string, callback: (component: object | null, error?: any) => void): void;
    installPackage(aPackage: any, repo?: any): Promise<SFItemData>;
    downloadPackageDetails(url: string, callback: Callback<[any, any?]>): void;
    itemForPackage(packageInfo: InstallPackageData): SFItemData | undefined;
    itemForId(uuid: string): SFItemData;
    indexOfItem(item: SFItemData): number;
    removeItemFromItems(item: SFItemData): void;
    allInstalled(): SFItemData[];
    addUpdateObserver(callback: Callback): {
        id: number;
        callback: Callback<[]>;
    };
    removeUpdateObserver(observer: ObserverCallback): void;
    notifyObserversOfUpdate(): void;
    private createComponentDataForPackage;
}
export {};
