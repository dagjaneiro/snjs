"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var httpManager_1 = require("./httpManager");
var localItemSync_1 = require("./localItemSync");
var repoManager_1 = require("./repoManager");
var ExtensionsManager = /** @class */ (function (_super) {
    __extends(ExtensionsManager, _super);
    function ExtensionsManager(modelManager, syncManager, extensionStorage) {
        var _this = _super.call(this, 'extensions-manager', [repoManager_1.ExtensionRepoContentType], modelManager, syncManager) || this;
        _this.extensionStorage = extensionStorage;
        _this.updateObservers = [];
        _this.repos = [];
        return _this;
    }
    Object.defineProperty(ExtensionsManager.prototype, "installedRepos", {
        get: function () {
            return this.items;
        },
        enumerable: true,
        configurable: true
    });
    ExtensionsManager.prototype.onItemAdded = function (item) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.repos.push(new repoManager_1.default(item, this.modelManager, this.syncManager, this.extensionStorage));
                return [2 /*return*/];
            });
        });
    };
    ExtensionsManager.prototype.onItemDeleted = function (item) {
        return __awaiter(this, void 0, void 0, function () {
            var repo;
            return __generator(this, function (_a) {
                repo = this.repos.find(function (r) { return item.uuid === r.uuid; });
                if (repo) {
                    repo.dispose();
                }
                this.repos = this.repos.filter(function (r) {
                    return r.uuid !== item.uuid;
                });
                return [2 /*return*/];
            });
        });
    };
    // Repo management
    ExtensionsManager.prototype.addRepo = function (url) {
        var item = this.modelManager.createItem({
            content_type: repoManager_1.ExtensionRepoContentType,
            content: { url: url }
        });
        this.modelManager.addItem(item);
        this.modelManager.setItemDirty(item);
    };
    ExtensionsManager.prototype.uninstallRepo = function (repo) {
        var item = this.modelManager.findItem(repo.uuid);
        if (item) {
            this.modelManager.setItemToBeDeleted(item);
        }
        else {
            console.error('The item you are trying to delete cannot be found.');
        }
    };
    ExtensionsManager.prototype.installPackageFromUrl = function (url, callback) {
        var _this = this;
        httpManager_1.default.get().getAbsolute(url, {}, function (response) {
            _this.installPackage(response).then(function (component) {
                callback(component);
            });
            callback(response);
        }, function (error) {
            console.log('Error installing from url', error);
            callback(null, error || {});
        });
    };
    ExtensionsManager.prototype.installPackage = function (aPackage, repo) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var data = _this.createComponentDataForPackage(aPackage, repo);
                        var item = _this.modelManager.createItem(data);
                        _this.modelManager.addItem(item);
                        _this.modelManager.setItemDirty(item);
                        resolve(data);
                    })];
            });
        });
    };
    ExtensionsManager.prototype.downloadPackageDetails = function (url, callback) {
        httpManager_1.default.get().getAbsolute(url, {}, function (response) {
            callback(response);
        }, function (error) {
            console.log('Error downloading package details', error);
            callback(null, error || {});
        });
    };
    // Manage local items
    ExtensionsManager.prototype.itemForPackage = function (packageInfo) {
        var result = this.items.find(function (item) {
            if (!item.content.package_info) {
                if (!item.content.url) {
                    return false;
                }
                // Legacy component without package_info, search by url or name
                // We also check if the item content url contains the substring that is packageInfo, since
                // newer URL formats remove extraneous query params from the end
                return (item.content.url === packageInfo.url ||
                    item.content.url.includes(packageInfo.url) ||
                    item.content.name === packageInfo.name);
            }
            return (item.content.package_info &&
                !item.deleted &&
                item.content.package_info.identifier === packageInfo.identifier);
        });
        return result;
    };
    ExtensionsManager.prototype.itemForId = function (uuid) {
        return this.items.filter(function (item) {
            return item.uuid === uuid;
        })[0];
    };
    ExtensionsManager.prototype.indexOfItem = function (item) {
        for (var index in this.items) {
            if (this.items[index].uuid === item.uuid) {
                return Number(index);
            }
        }
        return -1;
    };
    ExtensionsManager.prototype.removeItemFromItems = function (item) {
        this.items = this.items.filter(function (candidate) {
            return candidate.uuid !== item.uuid;
        });
    };
    ExtensionsManager.prototype.allInstalled = function () {
        return this.items.filter(function (item) {
            return item.content_type !== repoManager_1.ExtensionRepoContentType;
        });
    };
    // Observers
    ExtensionsManager.prototype.addUpdateObserver = function (callback) {
        var observer = { id: Math.random(), callback: callback };
        this.updateObservers.push(observer);
        return observer;
    };
    ExtensionsManager.prototype.removeUpdateObserver = function (observer) {
        this.updateObservers.splice(this.updateObservers.indexOf(observer), 1);
    };
    ExtensionsManager.prototype.notifyObserversOfUpdate = function () {
        for (var _i = 0, _a = this.updateObservers; _i < _a.length; _i++) {
            var observer = _a[_i];
            observer.callback();
        }
    };
    ExtensionsManager.prototype.createComponentDataForPackage = function (aPackage, repo) {
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
    };
    return ExtensionsManager;
}(localItemSync_1.default));
exports.default = ExtensionsManager;
//# sourceMappingURL=extensionsManager.js.map