"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var LocalItemSync = /** @class */ (function () {
    function LocalItemSync(observerId, contentTypes, modelManager, syncManager) {
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
    LocalItemSync.prototype.onItemAdded = function (item) {
        return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/];
        }); });
    };
    // tslint:disable-next-line:no-empty
    LocalItemSync.prototype.onItemDeleted = function (item) {
        return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/];
        }); });
    };
    // tslint:disable-next-line:no-empty
    LocalItemSync.prototype.onItemUpdated = function (item) {
        return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/];
        }); });
    };
    LocalItemSync.prototype.beginObservingItems = function () {
        var _this = this;
        this.isStreaming = true;
        this.modelManager.addItemSyncObserver(this.observerId, this.contentTypes, function (allItems) {
            for (var _i = 0, allItems_1 = allItems; _i < allItems_1.length; _i++) {
                var item = allItems_1[_i];
                if (item.deleted) {
                    _this.onItemDeleted(item);
                    _this.removeItemFromItems(item);
                    continue;
                }
                if (item.isMetadataUpdate) {
                    continue;
                }
                var index = _this.indexOfItem(item);
                if (index >= 0) {
                    _this.onItemUpdated(item);
                    _this.items[index] = item;
                }
                else {
                    _this.onItemAdded(item);
                    _this.items.push(item);
                }
            }
        });
    };
    LocalItemSync.prototype.createItem = function (itemData) {
        var item = this.modelManager.createItem(itemData);
        this.modelManager.addItem(item);
        this.modelManager.setItemDirty(item);
        this.syncManager.sync();
    };
    LocalItemSync.prototype.updateItem = function (itemData) {
        var item = this.modelManager.findItem(itemData.uuid);
        // tslint:disable-next-line:no-debugger
        debugger;
        item.content.local_url = itemData.content.local_url;
        this.modelManager.setItemDirty(item);
        this.syncManager.sync();
    };
    LocalItemSync.prototype.deleteItem = function (itemData) {
        var item = this.modelManager.findItem(itemData.uuid);
        if (item) {
            this.modelManager.setItemToBeDeleted(item);
            this.syncManager.sync();
        }
        else {
            console.error('The item you are trying to delete cannot be found.');
        }
    };
    LocalItemSync.prototype.dispose = function () {
        this.modelManager.removeItemSyncObserver(this.observerId);
    };
    LocalItemSync.prototype.itemForId = function (uuid) {
        return this.items.filter(function (item) {
            return item.uuid === uuid;
        })[0];
    };
    LocalItemSync.prototype.indexOfItem = function (item) {
        for (var index in this.items) {
            if (this.items[index].uuid === item.uuid) {
                return Number(index);
            }
        }
        return -1;
    };
    LocalItemSync.prototype.removeItemFromItems = function (item) {
        this.items = this.items.filter(function (candidate) {
            return candidate.uuid !== item.uuid;
        });
    };
    return LocalItemSync;
}());
exports.default = LocalItemSync;
//# sourceMappingURL=localItemSync.js.map