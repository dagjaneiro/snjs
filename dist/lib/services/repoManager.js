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
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var types_1 = require("../types");
var httpManager_1 = require("./httpManager");
var localItemSync_1 = require("./localItemSync");
exports.RepoManifestContentType = 'SN|Repo';
exports.ExtensionRepoContentType = 'SN|ExtensionRepo';
var download = function (url) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, new Promise(function (resolve, reject) {
                return httpManager_1.default.get().getAbsolute(url, {}, function (response) { return resolve(response); }, function (error) { return reject(error); });
            })];
    });
}); };
var RepoManager = /** @class */ (function (_super) {
    __extends(RepoManager, _super);
    function RepoManager(repo, modelManager, syncManager, extensionStorage) {
        var _this = _super.call(this, "repo-manager-" + repo.uuid, Object.values(types_1.ExtensionContentTypes), modelManager, syncManager) || this;
        _this.repo = repo;
        _this.extensionStorage = extensionStorage;
        _this.packages = [];
        return _this;
    }
    Object.defineProperty(RepoManager.prototype, "uuid", {
        get: function () {
            return this.repo.uuid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RepoManager.prototype, "availablePackages", {
        get: function () {
            var _this = this;
            return this.packages.filter(function (available) {
                return !_this.items.find(function (installed) { return installed.content.identifier === available.identifier; });
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RepoManager.prototype, "installedPackages", {
        get: function () {
            return this.items;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RepoManager.prototype, "cachedPackages", {
        get: function () {
            return this.items.filter(function (installed) { return installed.content.local_url; });
        },
        enumerable: true,
        configurable: true
    });
    RepoManager.prototype.updateAvailablePackages = function (url) {
        return __awaiter(this, void 0, void 0, function () {
            var response, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, download(url)];
                    case 1:
                        response = _a.sent();
                        if (response.content_type === exports.RepoManifestContentType) {
                            this.packages = response.packages;
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        e_1 = _a.sent();
                        console.log('Failed to download repo manifest');
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // Try to install package locally
    RepoManager.prototype.onItemAdded = function (item) {
        return __awaiter(this, void 0, void 0, function () {
            var installedItem, model;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.extensionStorage && item.content.local_url === null)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.extensionStorage.install(item)];
                    case 1:
                        installedItem = _a.sent();
                        model = this.modelManager.findItem(item.uuid);
                        // tslint:disable-next-line:no-debugger
                        debugger;
                        model.content.local_url = installedItem.content.local_url;
                        this.modelManager.setItemDirty(model);
                        this.syncManager.sync();
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    // async installPackage();
    // Manage local items
    RepoManager.prototype.itemForPackage = function (packageInfo) {
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
    return RepoManager;
}(localItemSync_1.default));
exports.default = RepoManager;
//# sourceMappingURL=repoManager.js.map