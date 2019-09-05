export default class LocalItemSync {
  constructor(observerId, contentTypes, modelManager, syncManager) {
    this.observerId = observerId;
    this.contentTypes = contentTypes;
    this.modelManager = modelManager;
    this.syncManager = syncManager;

    this.isDisposed = false;
    this.isStreaming = false;
    this.items = [];

    this.beginObservingItems();
  }

  // tslint:disable-next-line:no-empty
  async onItemAdded(item) {}

  // tslint:disable-next-line:no-empty
  async onItemDeleted(item) {}

  // tslint:disable-next-line:no-empty
  async onItemUpdated(item) {}

  beginObservingItems() {
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

  createItem(itemData) {
    const item = this.modelManager.createItem(itemData);
    this.modelManager.addItem(item);
    this.modelManager.setItemDirty(item);
    this.syncManager.sync();
  }

  updateItem(itemData) {
    const item = this.modelManager.findItem(itemData.uuid);
    item.content.local_url = itemData.content.local_url;
    this.modelManager.setItemDirty(item);
    this.syncManager.sync();
  }

  deleteItem(itemData) {
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
}
