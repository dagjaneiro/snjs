import { SFItemData } from 'standard-file-js';
import { SFModelManager } from 'standard-file-js/lib/app/lib/modelManager';
import { SFSyncManager } from 'standard-file-js/lib/app/lib/syncManager';
import { IDisposable } from '../types';
export default abstract class LocalItemSync implements IDisposable {
    protected observerId: string;
    protected contentTypes: string[];
    protected modelManager: SFModelManager;
    protected syncManager: SFSyncManager;
    isDisposed: boolean;
    protected isStreaming: boolean;
    protected items: SFItemData[];
    constructor(observerId: string, contentTypes: string[], modelManager: SFModelManager, syncManager: SFSyncManager);
    onItemAdded(item: SFItemData): Promise<void>;
    onItemDeleted(item: SFItemData): Promise<void>;
    onItemUpdated(item: SFItemData): Promise<void>;
    private beginObservingItems;
    createItem(itemData: SFItemData): void;
    updateItem(itemData: SFItemData): void;
    deleteItem(itemData: SFItemData): void;
    dispose(): void;
    itemForId(uuid: string): SFItemData;
    indexOfItem(item: SFItemData): number;
    removeItemFromItems(item: SFItemData): void;
}
