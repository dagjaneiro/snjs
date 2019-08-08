import { SFItemData } from 'standard-file-js';
import { SFModelManager } from 'standard-file-js/lib/app/lib/modelManager';
import { SFSyncManager } from 'standard-file-js/lib/app/lib/syncManager';
import { IDisposable } from '../types';

export default abstract class LocalItemSync implements IDisposable {
  isDisposed = false;
  protected isStreaming = false;
  protected items: SFItemData[] = [];

  constructor(
    protected observerId: string,
    protected contentTypes: string[],
    protected modelManager: SFModelManager,
    protected syncManager: SFSyncManager
  ) {
    this.beginObservingItems();
  }

  // tslint:disable-next-line:no-empty
  async onItemAdded(item: SFItemData) {}
  // tslint:disable-next-line:no-empty
  async onItemDeleted(item: SFItemData) {}
  // tslint:disable-next-line:no-empty
  async onItemUpdated(item: SFItemData) {}

  private beginObservingItems() {
    this.isStreaming = true;
    this.modelManager.addItemSyncObserver(
      this.observerId,
      this.contentTypes,
      allItems => {
        for (const item of allItems) {
          if (item.deleted) {
            this.onItemDeleted(item);
            this.removeItemFromItems(item);
            continue;
          }
          if (item.isMetadataUpdate) {
            continue;
          }

          const index = this.indexOfItem(item);
          if (index >= 0) {
            this.onItemUpdated(item);
            this.items[index] = item;
          } else {
            this.onItemAdded(item);
            this.items.push(item);
          }
        }
      }
    );
  }

  createItem(itemData: SFItemData) {
    const item = this.modelManager.createItem(itemData);
    this.modelManager.addItem(item);
    this.modelManager.setItemDirty(item);
    this.syncManager.sync();
  }

  updateItem(itemData: SFItemData) {
    const item = this.modelManager.findItem(itemData.uuid);
    // tslint:disable-next-line:no-debugger
    debugger;
    item.content.local_url = itemData.content.local_url;
    this.modelManager.setItemDirty(item);
    this.syncManager.sync();
  }

  deleteItem(itemData: SFItemData) {
    const item = this.modelManager.findItem(itemData.uuid);
    if (item) {
      this.modelManager.setItemToBeDeleted(item);
      this.syncManager.sync();
    } else {
      console.error('The item you are trying to delete cannot be found.');
    }
  }

  dispose() {
    this.modelManager.removeItemSyncObserver(this.observerId);
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
}
