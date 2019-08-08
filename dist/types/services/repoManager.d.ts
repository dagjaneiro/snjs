import { SFItemData } from 'standard-file-js';
import { SFModelManager } from 'standard-file-js/lib/app/lib/modelManager';
import { SFSyncManager } from 'standard-file-js/lib/app/lib/syncManager';
import LocalItemSync from './localItemSync';
export declare const RepoManifestContentType = "SN|Repo";
export declare const ExtensionRepoContentType = "SN|ExtensionRepo";
export interface IExtensionStorage {
    install(extension: SFItemData): SFItemData;
    isInstalled(extension: SFItemData): boolean;
    uninstall(extension: SFItemData): void;
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
export default class RepoManager extends LocalItemSync {
    private repo;
    private extensionStorage?;
    private packages;
    constructor(repo: SFItemData, modelManager: SFModelManager, syncManager: SFSyncManager, extensionStorage?: IExtensionStorage | undefined);
    readonly uuid: string | undefined;
    readonly availablePackages: PackageManifest[];
    readonly installedPackages: SFItemData[];
    readonly cachedPackages: SFItemData[];
    updateAvailablePackages(url: string): Promise<void>;
    onItemAdded(item: SFItemData): Promise<void>;
    itemForPackage(packageInfo: PackageManifest): SFItemData | undefined;
}
export {};
