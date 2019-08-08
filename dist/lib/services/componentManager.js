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
import _ from 'lodash';
import { StandardFile } from 'standard-file-js/lib/standard_file';
import { SFModelManager } from 'standard-file-js/lib/app/lib/modelManager';
var SNComponentManager = /** @class */ (function () {
    /*
      @param {string} environment: one of [web, desktop, mobile]
      @param {string} platform: one of [ios, android, linux-${environment}, mac-${environment}, windows-${environment}]
    */
    function SNComponentManager(_a) {
        var modelManager = _a.modelManager, syncManager = _a.syncManager, desktopManager = _a.desktopManager, nativeExtManager = _a.nativeExtManager, alertManager = _a.alertManager, $uiRunner = _a.$uiRunner, $timeout = _a.$timeout, environment = _a.environment, platform = _a.platform;
        // Some actions need to be run on the ui thread (desktop/web only)
        this.$uiRunner =
            $uiRunner ||
                (function (fn) {
                    fn();
                });
        this.$timeout = $timeout || setTimeout.bind(window);
        this.modelManager = modelManager;
        this.syncManager = syncManager;
        this.desktopManager = desktopManager;
        this.nativeExtManager = nativeExtManager;
        this.alertManager = alertManager;
        this.streamObservers = [];
        this.contextStreamObservers = [];
        this.activeComponents = [];
        this.environment = environment;
        this.platform = platform;
        this.isDesktop = this.environment == 'desktop';
        this.isMobile = this.environment == 'mobile';
        this.SFJS = new StandardFile();
        if (environment != 'mobile') {
            this.configureForNonMobileUsage();
        }
        this.configureForGeneralUsage();
        // this.loggingEnabled = true;
        this.permissionDialogs = [];
        this.handlers = [];
    }
    SNComponentManager.prototype.configureForGeneralUsage = function () {
        var _this = this;
        this.modelManager.addItemSyncObserver('component-manager', '*', function (allItems, validItems, deletedItems, source, sourceKey) {
            var syncedComponents = allItems.filter(function (item) {
                return (item.content_type === 'SN|Component' ||
                    item.content_type == 'SN|Theme');
            });
            /* We only want to sync if the item source is Retrieved, not MappingSourceRemoteSaved to avoid
            recursion caused by the component being modified and saved after it is updated.
          */
            if (syncedComponents.length > 0 &&
                source != SFModelManager.MappingSourceRemoteSaved) {
                // Ensure any component in our data is installed by the system
                if (_this.isDesktop) {
                    _this.desktopManager.syncComponentsInstallation(syncedComponents);
                }
            }
            for (var _i = 0, syncedComponents_1 = syncedComponents; _i < syncedComponents_1.length; _i++) {
                var component = syncedComponents_1[_i];
                var activeComponent = _.find(_this.activeComponents, {
                    uuid: component.uuid
                });
                if (component.active && !component.deleted && !activeComponent) {
                    _this.activateComponent(component);
                }
                else if (!component.active && activeComponent) {
                    _this.deactivateComponent(component);
                }
            }
            var _loop_1 = function (observer) {
                if (sourceKey && sourceKey == observer.component.uuid) {
                    return "continue";
                }
                var relevantItems = allItems.filter(function (item) {
                    return observer.contentTypes.indexOf(item.content_type) !== -1;
                });
                if (relevantItems.length == 0) {
                    return "continue";
                }
                var requiredPermissions = [
                    {
                        name: 'stream-items',
                        content_types: observer.contentTypes.sort()
                    }
                ];
                _this.runWithPermissions(observer.component, requiredPermissions, function () {
                    _this.sendItemsInReply(observer.component, relevantItems, observer.originalMessage);
                });
            };
            for (var _a = 0, _b = _this.streamObservers; _a < _b.length; _a++) {
                var observer = _b[_a];
                _loop_1(observer);
            }
            var requiredContextPermissions = [
                {
                    name: 'stream-context-item'
                }
            ];
            var _loop_2 = function (observer) {
                if (sourceKey && sourceKey == observer.component.uuid) {
                    return "continue";
                }
                for (var _i = 0, _a = _this.handlers; _i < _a.length; _i++) {
                    var handler = _a[_i];
                    if (!handler.areas.includes(observer.component.area) &&
                        !handler.areas.includes('*')) {
                        continue;
                    }
                    if (handler.contextRequestHandler) {
                        itemInContext = handler.contextRequestHandler(observer.component);
                        if (itemInContext) {
                            matchingItem = _.find(allItems, {
                                uuid: itemInContext.uuid
                            });
                            if (matchingItem) {
                                _this.runWithPermissions(observer.component, requiredContextPermissions, function () {
                                    _this.sendContextItemInReply(observer.component, matchingItem, observer.originalMessage, source);
                                });
                            }
                        }
                    }
                }
            };
            var itemInContext, matchingItem;
            for (var _c = 0, _d = _this.contextStreamObservers; _c < _d.length; _c++) {
                var observer = _d[_c];
                _loop_2(observer);
            }
        });
    };
    SNComponentManager.prototype.configureForNonMobileUsage = function () {
        var _this = this;
        var detectFocusChange = function (event) {
            for (var _i = 0, _a = _this.activeComponents; _i < _a.length; _i++) {
                var component = _a[_i];
                if (document.activeElement == _this.iframeForComponent(component)) {
                    _this.$timeout(function () {
                        _this.focusChangedForComponent(component);
                    });
                    break;
                }
            }
        };
        window.addEventListener
            ? window.addEventListener('focus', detectFocusChange, true)
            : window.attachEvent('onfocusout', detectFocusChange);
        window.addEventListener
            ? window.addEventListener('blur', detectFocusChange, true)
            : window.attachEvent('onblur', detectFocusChange);
        this.desktopManager.registerUpdateObserver(function (component) {
            // Reload theme if active
            if (component.active && component.isTheme()) {
                _this.postActiveThemesToAllComponents();
            }
        });
        // On mobile, events listeners are handled by a respective component
        window.addEventListener('message', function (event) {
            if (_this.loggingEnabled) {
                console.log('Web app: received message', event);
            }
            // Make sure this message is for us
            if (event.data.sessionKey) {
                _this.handleMessage(_this.componentForSessionKey(event.data.sessionKey), event.data);
            }
        }, false);
    };
    SNComponentManager.prototype.postActiveThemesToAllComponents = function () {
        for (var _i = 0, _a = this.components; _i < _a.length; _i++) {
            var component = _a[_i];
            // Skip over components that are themes themselves,
            // or components that are not active, or components that don't have a window
            if (component.isTheme() || !component.active || !component.window) {
                continue;
            }
            this.postActiveThemesToComponent(component);
        }
    };
    SNComponentManager.prototype.getActiveThemes = function () {
        return this.componentsForArea('themes').filter(function (theme) {
            return theme.active;
        });
    };
    SNComponentManager.prototype.urlsForActiveThemes = function () {
        var _this = this;
        var themes = this.getActiveThemes();
        return themes.map(function (theme) {
            return _this.urlForComponent(theme);
        });
    };
    SNComponentManager.prototype.postActiveThemesToComponent = function (component) {
        var urls = this.urlsForActiveThemes();
        var data = { themes: urls };
        this.sendMessageToComponent(component, { action: 'themes', data: data });
    };
    SNComponentManager.prototype.contextItemDidChangeInArea = function (area) {
        for (var _i = 0, _a = this.handlers; _i < _a.length; _i++) {
            var handler = _a[_i];
            if (handler.areas.includes(area) === false &&
                !handler.areas.includes('*')) {
                continue;
            }
            var observers = this.contextStreamObservers.filter(function (observer) {
                return observer.component.area === area;
            });
            for (var _b = 0, observers_1 = observers; _b < observers_1.length; _b++) {
                var observer = observers_1[_b];
                if (handler.contextRequestHandler) {
                    var itemInContext = handler.contextRequestHandler(observer.component);
                    if (itemInContext) {
                        this.sendContextItemInReply(observer.component, itemInContext, observer.originalMessage);
                    }
                }
            }
        }
    };
    SNComponentManager.prototype.setComponentHidden = function (component, hidden) {
        /*
          A hidden component will not receive messages.
          However, when a component is unhidden, we need to send it any items it may have
          registered streaming for.
        */
        if (hidden) {
            component.hidden = true;
        }
        else if (component.hidden) {
            // Only enter this condition if component is hidden to make this note have double side effects.
            component.hidden = false;
            // streamContextItem
            var contextObserver = _.find(this.contextStreamObservers, {
                identifier: component.uuid
            });
            if (contextObserver) {
                this.handleStreamContextItemMessage(component, contextObserver.originalMessage);
            }
            // streamItems
            var streamObserver = _.find(this.streamObservers, {
                identifier: component.uuid
            });
            if (streamObserver) {
                this.handleStreamItemsMessage(component, streamObserver.originalMessage);
            }
        }
    };
    SNComponentManager.prototype.jsonForItem = function (item, component, source) {
        var params = {
            uuid: item.uuid,
            content_type: item.content_type,
            created_at: item.created_at,
            updated_at: item.updated_at,
            deleted: item.deleted
        };
        params.content = item.createContentJSONFromProperties();
        params.clientData =
            item.getDomainDataItem(component.getClientDataKey(), SNComponentManager.ClientDataDomain) || {};
        // isMetadataUpdate implies that the extension should make reference of updated metadata,
        // but not update content values as they may be stale relative to what the extension currently has
        // Changes are always metadata updates if the mapping source is SFModelManager.MappingSourceRemoteSaved || source == SFModelManager.MappingSourceLocalSaved.
        //
        if (source &&
            (source == SFModelManager.MappingSourceRemoteSaved ||
                source == SFModelManager.MappingSourceLocalSaved)) {
            params.isMetadataUpdate = true;
        }
        this.removePrivatePropertiesFromResponseItems([params], component, {
            type: 'outgoing'
        });
        return params;
    };
    SNComponentManager.prototype.sendItemsInReply = function (component, items, message, source) {
        var _this = this;
        if (this.loggingEnabled) {
            console.log('Web|componentManager|sendItemsInReply', component, items, message);
        }
        var response = { items: {} };
        var mapped = items.map(function (item) {
            return _this.jsonForItem(item, component, source);
        });
        response.items = mapped;
        this.replyToMessage(component, message, response);
    };
    SNComponentManager.prototype.sendContextItemInReply = function (component, item, originalMessage, source) {
        if (this.loggingEnabled) {
            console.log('Web|componentManager|sendContextItemInReply', component, item, originalMessage);
        }
        var response = { item: this.jsonForItem(item, component, source) };
        this.replyToMessage(component, originalMessage, response);
    };
    SNComponentManager.prototype.replyToMessage = function (component, originalMessage, replyData) {
        var reply = {
            action: 'reply',
            original: originalMessage,
            data: replyData
        };
        this.sendMessageToComponent(component, reply);
    };
    SNComponentManager.prototype.sendMessageToComponent = function (component, message) {
        var permissibleActionsWhileHidden = ['component-registered', 'themes'];
        if (component.hidden &&
            !permissibleActionsWhileHidden.includes(message.action)) {
            if (this.loggingEnabled) {
                console.log('Component disabled for current item, not sending any messages.', component.name);
            }
            return;
        }
        if (this.loggingEnabled) {
            console.log('Web|sendMessageToComponent', component, message);
        }
        var origin = this.urlForComponent(component, 'file://');
        if (!origin.startsWith('http') && !origin.startsWith('file')) {
            // Native extension running in web, prefix current host
            origin = window.location.href + origin;
        }
        if (!component.window) {
            this.alertManager.alert({
                text: "Standard Notes is trying to communicate with " + component.name + ", but an error is occurring. Please restart this extension and try again."
            });
        }
        // Mobile messaging requires json
        if (this.isMobile) {
            message = JSON.stringify(message);
        }
        component.window.postMessage(message, origin);
    };
    Object.defineProperty(SNComponentManager.prototype, "components", {
        get: function () {
            return this.modelManager.allItemsMatchingTypes([
                'SN|Component',
                'SN|Theme'
            ]);
        },
        enumerable: true,
        configurable: true
    });
    SNComponentManager.prototype.componentsForArea = function (area) {
        return this.components.filter(function (component) {
            return component.area === area;
        });
    };
    SNComponentManager.prototype.urlForComponent = function (component, offlinePrefix) {
        if (offlinePrefix === void 0) { offlinePrefix = ''; }
        // offlineOnly is available only on desktop, and not on web or mobile.
        if (component.offlineOnly && !this.isDesktop) {
            return null;
        }
        if (component.offlineOnly || (this.isDesktop && component.local_url)) {
            return (component.local_url &&
                component.local_url.replace('sn://', offlinePrefix + this.desktopManager.getApplicationDataPath() + '/'));
        }
        else {
            var url = component.hosted_url || component.legacy_url;
            if (this.isMobile) {
                var localReplacement = this.platform == 'ios' ? 'localhost' : '10.0.2.2';
                url = url
                    .replace('localhost', localReplacement)
                    .replace('sn.local', localReplacement);
            }
            return url;
        }
    };
    SNComponentManager.prototype.componentForUrl = function (url) {
        return this.components.filter(function (component) {
            return component.hosted_url === url || component.legacy_url === url;
        })[0];
    };
    SNComponentManager.prototype.componentForSessionKey = function (key) {
        var component = _.find(this.components, { sessionKey: key });
        if (!component) {
            for (var _i = 0, _a = this.handlers; _i < _a.length; _i++) {
                var handler = _a[_i];
                if (handler.componentForSessionKeyHandler) {
                    component = handler.componentForSessionKeyHandler(key);
                    if (component) {
                        break;
                    }
                }
            }
        }
        return component;
    };
    SNComponentManager.prototype.handleMessage = function (component, message) {
        if (!component) {
            console.log('Component not defined for message, returning', message);
            this.alertManager.alert({
                text: 'An extension is trying to communicate with Standard Notes, but there is an error establishing a bridge. Please restart the app and try again.'
            });
            return;
        }
        // Actions that won't succeeed with readonly mode
        var readwriteActions = [
            'save-items',
            'associate-item',
            'deassociate-item',
            'create-item',
            'create-items',
            'delete-items',
            'set-component-data'
        ];
        if (component.readonly && readwriteActions.includes(message.action)) {
            // A component can be marked readonly if changes should not be saved.
            // Particullary used for revision preview windows where the notes should not be savable.
            this.alertManager.alert({
                text: "The extension " + component.name + " is trying to save, but it is in a locked state and cannot accept changes."
            });
            return;
        }
        /**
        Possible Messages:
          set-size
          stream-items
          stream-context-item
          save-items
          select-item
          associate-item
          deassociate-item
          clear-selection
          create-item
          create-items
          delete-items
          set-component-data
          install-local-component
          toggle-activate-component
          request-permissions
          present-conflict-resolution
        */
        if (message.action === 'stream-items') {
            this.handleStreamItemsMessage(component, message);
        }
        else if (message.action === 'stream-context-item') {
            this.handleStreamContextItemMessage(component, message);
        }
        else if (message.action === 'set-component-data') {
            this.handleSetComponentDataMessage(component, message);
        }
        else if (message.action === 'delete-items') {
            this.handleDeleteItemsMessage(component, message);
        }
        else if (message.action === 'create-items' ||
            message.action === 'create-item') {
            this.handleCreateItemsMessage(component, message);
        }
        else if (message.action === 'save-items') {
            this.handleSaveItemsMessage(component, message);
        }
        else if (message.action === 'toggle-activate-component') {
            var componentToToggle = this.modelManager.findItem(message.data.uuid);
            this.handleToggleComponentMessage(component, componentToToggle, message);
        }
        else if (message.action === 'request-permissions') {
            this.handleRequestPermissionsMessage(component, message);
        }
        else if (message.action === 'install-local-component') {
            this.handleInstallLocalComponentMessage(component, message);
        }
        else if (message.action === 'duplicate-item') {
            this.handleDuplicateItemMessage(component, message);
        }
        var _loop_3 = function (handler) {
            if (handler.actionHandler &&
                (handler.areas.includes(component.area) || handler.areas.includes('*'))) {
                this_1.$timeout(function () {
                    handler.actionHandler(component, message.action, message.data);
                });
            }
        };
        var this_1 = this;
        // Notify observers
        for (var _i = 0, _a = this.handlers; _i < _a.length; _i++) {
            var handler = _a[_i];
            _loop_3(handler);
        }
    };
    SNComponentManager.prototype.removePrivatePropertiesFromResponseItems = function (responseItems, component, options) {
        if (options === void 0) { options = {}; }
        // can be 'incoming' or 'outgoing'. We want to remove updated_at if incoming, but keep it if outgoing
        if (options.type == 'incoming') {
            var privateTopLevelProperties = ['updated_at'];
            // Maintaining our own updated_at value is imperative for sync to work properly, we ignore any incoming value.
            for (var _i = 0, responseItems_1 = responseItems; _i < responseItems_1.length; _i++) {
                var responseItem = responseItems_1[_i];
                if (typeof responseItem.setDirty === 'function') {
                    console.error('Attempting to pass object. Use JSON.');
                    continue;
                }
                for (var _a = 0, privateTopLevelProperties_1 = privateTopLevelProperties; _a < privateTopLevelProperties_1.length; _a++) {
                    var privateProperty = privateTopLevelProperties_1[_a];
                    delete responseItem[privateProperty];
                }
            }
        }
        if (component) {
            // System extensions can bypass this step
            if (this.nativeExtManager &&
                this.nativeExtManager.isSystemExtension(component)) {
                return;
            }
        }
        // Don't allow component to overwrite these properties.
        var privateContentProperties = [
            'autoupdateDisabled',
            'permissions',
            'active'
        ];
        if (options) {
            if (options.includeUrls) {
                privateContentProperties = privateContentProperties.concat([
                    'url',
                    'hosted_url',
                    'local_url'
                ]);
            }
        }
        for (var _b = 0, responseItems_2 = responseItems; _b < responseItems_2.length; _b++) {
            var responseItem = responseItems_2[_b];
            // Do not pass in actual items here, otherwise that would be destructive.
            // Instead, generic JS/JSON objects should be passed.
            if (typeof responseItem.setDirty === 'function') {
                console.error('Attempting to pass object. Use JSON.');
                continue;
            }
            for (var _c = 0, privateContentProperties_1 = privateContentProperties; _c < privateContentProperties_1.length; _c++) {
                var prop = privateContentProperties_1[_c];
                delete responseItem.content[prop];
            }
        }
    };
    SNComponentManager.prototype.handleStreamItemsMessage = function (component, message) {
        var _this = this;
        var requiredPermissions = [
            {
                name: 'stream-items',
                content_types: message.data.content_types.sort()
            }
        ];
        this.runWithPermissions(component, requiredPermissions, function () {
            if (!_.find(_this.streamObservers, { identifier: component.uuid })) {
                // for pushing laster as changes come in
                _this.streamObservers.push({
                    identifier: component.uuid,
                    component: component,
                    originalMessage: message,
                    contentTypes: message.data.content_types
                });
            }
            // push immediately now
            var items = [];
            for (var _i = 0, _a = message.data.content_types; _i < _a.length; _i++) {
                var contentType = _a[_i];
                items = items.concat(_this.modelManager.validItemsForContentType(contentType));
            }
            _this.sendItemsInReply(component, items, message);
        });
    };
    SNComponentManager.prototype.handleStreamContextItemMessage = function (component, message) {
        var _this = this;
        var requiredPermissions = [
            {
                name: 'stream-context-item'
            }
        ];
        this.runWithPermissions(component, requiredPermissions, function () {
            if (!_.find(_this.contextStreamObservers, { identifier: component.uuid })) {
                // for pushing laster as changes come in
                _this.contextStreamObservers.push({
                    identifier: component.uuid,
                    component: component,
                    originalMessage: message
                });
            }
            // push immediately now
            for (var _i = 0, _a = _this.handlersForArea(component.area); _i < _a.length; _i++) {
                var handler = _a[_i];
                if (handler.contextRequestHandler) {
                    var itemInContext = handler.contextRequestHandler(component);
                    if (itemInContext) {
                        _this.sendContextItemInReply(component, itemInContext, message);
                    }
                }
            }
        });
    };
    SNComponentManager.prototype.isItemIdWithinComponentContextJurisdiction = function (uuid, component) {
        var itemIdsInJurisdiction = this.itemIdsInContextJurisdictionForComponent(component);
        return itemIdsInJurisdiction.includes(uuid);
    };
    /* Returns items that given component has context permissions for */
    SNComponentManager.prototype.itemIdsInContextJurisdictionForComponent = function (component) {
        var itemIds = [];
        for (var _i = 0, _a = this.handlersForArea(component.area); _i < _a.length; _i++) {
            var handler = _a[_i];
            if (handler.contextRequestHandler) {
                var itemInContext = handler.contextRequestHandler(component);
                if (itemInContext) {
                    itemIds.push(itemInContext.uuid);
                }
            }
        }
        return itemIds;
    };
    SNComponentManager.prototype.handlersForArea = function (area) {
        return this.handlers.filter(function (candidate) {
            return candidate.areas.includes(area);
        });
    };
    SNComponentManager.prototype.handleSaveItemsMessage = function (component, message) {
        return __awaiter(this, void 0, void 0, function () {
            var responseItems, requiredPermissions, itemIdsInContextJurisdiction, pendingResponseItems, _i, _a, responseItem, requiredContentTypes;
            var _this = this;
            return __generator(this, function (_b) {
                responseItems = message.data.items;
                requiredPermissions = [];
                itemIdsInContextJurisdiction = this.itemIdsInContextJurisdictionForComponent(component);
                pendingResponseItems = responseItems.slice();
                for (_i = 0, _a = responseItems.slice(); _i < _a.length; _i++) {
                    responseItem = _a[_i];
                    if (itemIdsInContextJurisdiction.includes(responseItem.uuid)) {
                        requiredPermissions.push({
                            name: 'stream-context-item'
                        });
                        _.pull(pendingResponseItems, responseItem);
                        // We break because there can only be one context item
                        break;
                    }
                }
                // Check to see if additional privileges are required
                if (pendingResponseItems.length > 0) {
                    requiredContentTypes = _.uniq(pendingResponseItems.map(function (i) {
                        return i.content_type;
                    })).sort();
                    requiredPermissions.push({
                        name: 'stream-items',
                        content_types: requiredContentTypes
                    });
                }
                this.runWithPermissions(component, requiredPermissions, function () { return __awaiter(_this, void 0, void 0, function () {
                    var ids, items, lockedCount, _i, items_1, item, itemNoun, auxVerb, localItems, _a, responseItems_3, responseItem, item;
                    var _this = this;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                this.removePrivatePropertiesFromResponseItems(responseItems, component, {
                                    includeUrls: true,
                                    type: 'incoming'
                                });
                                ids = responseItems.map(function (i) {
                                    return i.uuid;
                                });
                                items = this.modelManager.findItems(ids);
                                lockedCount = 0;
                                for (_i = 0, items_1 = items; _i < items_1.length; _i++) {
                                    item = items_1[_i];
                                    if (item.locked) {
                                        _.remove(responseItems, { uuid: item.uuid });
                                        lockedCount++;
                                    }
                                }
                                if (lockedCount > 0) {
                                    itemNoun = lockedCount == 1 ? 'item' : 'items';
                                    auxVerb = lockedCount == 1 ? 'is' : 'are';
                                    this.alertManager.alert({
                                        title: 'Items Locked',
                                        text: lockedCount + " " + itemNoun + " you are attempting to save " + auxVerb + " locked and cannot be edited."
                                    });
                                }
                                return [4 /*yield*/, this.modelManager.mapResponseItemsToLocalModels(responseItems, SFModelManager.MappingSourceComponentRetrieved, component.uuid)];
                            case 1:
                                localItems = _b.sent();
                                for (_a = 0, responseItems_3 = responseItems; _a < responseItems_3.length; _a++) {
                                    responseItem = responseItems_3[_a];
                                    item = _.find(localItems, { uuid: responseItem.uuid });
                                    if (!item) {
                                        // An item this extension is trying to save was possibly removed locally, notify user
                                        this.alertManager.alert({
                                            text: "The extension " + component.name + " is trying to save an item with type " + responseItem.content_type + ", but that item does not exist. Please restart this extension and try again."
                                        });
                                        continue;
                                    }
                                    if (!item.locked) {
                                        if (responseItem.clientData) {
                                            item.setDomainDataItem(component.getClientDataKey(), responseItem.clientData, SNComponentManager.ClientDataDomain);
                                        }
                                        this.modelManager.setItemDirty(item, true, true, SFModelManager.MappingSourceComponentRetrieved, component.uuid);
                                    }
                                }
                                this.syncManager.sync().then(function (response) {
                                    // Allow handlers to be notified when a save begins and ends, to update the UI
                                    var saveMessage = Object.assign({}, message);
                                    saveMessage.action =
                                        response && response.error ? 'save-error' : 'save-success';
                                    _this.replyToMessage(component, message, {
                                        error: response && response.error
                                    });
                                    _this.handleMessage(component, saveMessage);
                                });
                                return [2 /*return*/];
                        }
                    });
                }); });
                return [2 /*return*/];
            });
        });
    };
    SNComponentManager.prototype.handleDuplicateItemMessage = function (component, message) {
        var _this = this;
        var itemParams = message.data.item;
        var item = this.modelManager.findItem(itemParams.uuid);
        var requiredPermissions = [
            {
                name: 'stream-items',
                content_types: [item.content_type]
            }
        ];
        this.runWithPermissions(component, requiredPermissions, function () {
            var duplicate = _this.modelManager.duplicateItemAndAdd(item);
            _this.syncManager.sync();
            _this.replyToMessage(component, message, {
                item: _this.jsonForItem(duplicate, component)
            });
        });
    };
    SNComponentManager.prototype.handleCreateItemsMessage = function (component, message) {
        var _this = this;
        var responseItems = message.data.item
            ? [message.data.item]
            : message.data.items;
        var uniqueContentTypes = _.uniq(responseItems.map(function (item) {
            return item.content_type;
        }));
        var requiredPermissions = [
            {
                name: 'stream-items',
                content_types: uniqueContentTypes
            }
        ];
        this.runWithPermissions(component, requiredPermissions, function () {
            _this.removePrivatePropertiesFromResponseItems(responseItems, component, {
                type: 'incoming'
            });
            var processedItems = [];
            for (var _i = 0, responseItems_4 = responseItems; _i < responseItems_4.length; _i++) {
                var responseItem = responseItems_4[_i];
                var item = _this.modelManager.createItem(responseItem);
                if (responseItem.clientData) {
                    item.setDomainDataItem(component.getClientDataKey(), responseItem.clientData, SNComponentManager.ClientDataDomain);
                }
                _this.modelManager.addItem(item);
                _this.modelManager.resolveReferencesForItem(item, true);
                _this.modelManager.setItemDirty(item, true);
                processedItems.push(item);
            }
            _this.syncManager.sync();
            // "create-item" or "create-items" are possible messages handled here
            var reply = message.action == 'create-item'
                ? { item: _this.jsonForItem(processedItems[0], component) }
                : {
                    items: processedItems.map(function (item) {
                        return _this.jsonForItem(item, component);
                    })
                };
            _this.replyToMessage(component, message, reply);
        });
    };
    SNComponentManager.prototype.handleDeleteItemsMessage = function (component, message) {
        var _this = this;
        var requiredContentTypes = _.uniq(message.data.items.map(function (i) {
            return i.content_type;
        })).sort();
        var requiredPermissions = [
            {
                name: 'stream-items',
                content_types: requiredContentTypes
            }
        ];
        this.runWithPermissions(component, requiredPermissions, function () { return __awaiter(_this, void 0, void 0, function () {
            var itemsData, noun, reply, didConfirm, _i, itemsData_1, itemData, model;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        itemsData = message.data.items;
                        noun = itemsData.length == 1 ? 'item' : 'items';
                        didConfirm = true;
                        return [4 /*yield*/, this.alertManager
                                .confirm({
                                text: "Are you sure you want to delete " + itemsData.length + " " + noun + "?"
                            })
                                .catch(function () {
                                didConfirm = false;
                            })];
                    case 1:
                        _a.sent();
                        if (didConfirm) {
                            // Filter for any components and deactivate before deleting
                            for (_i = 0, itemsData_1 = itemsData; _i < itemsData_1.length; _i++) {
                                itemData = itemsData_1[_i];
                                model = this.modelManager.findItem(itemData.uuid);
                                if (!model) {
                                    this.alertManager.alert({
                                        text: "The item you are trying to delete cannot be found."
                                    });
                                    continue;
                                }
                                if (['SN|Component', 'SN|Theme'].includes(model.content_type)) {
                                    this.deactivateComponent(model, true);
                                }
                                this.modelManager.setItemToBeDeleted(model);
                                // Currently extensions are not notified of association until a full server sync completes.
                                // We manually notify observers.
                                this.modelManager.notifySyncObserversOfModels([model], SFModelManager.MappingSourceRemoteSaved);
                            }
                            this.syncManager.sync();
                            reply = { deleted: true };
                        }
                        else {
                            // Rejected by user
                            reply = { deleted: false };
                        }
                        this.replyToMessage(component, message, reply);
                        return [2 /*return*/];
                }
            });
        }); });
    };
    SNComponentManager.prototype.handleRequestPermissionsMessage = function (component, message) {
        var _this = this;
        this.runWithPermissions(component, message.data.permissions, function () {
            _this.replyToMessage(component, message, { approved: true });
        });
    };
    SNComponentManager.prototype.handleSetComponentDataMessage = function (component, message) {
        var _this = this;
        // A component setting its own data does not require special permissions
        this.runWithPermissions(component, [], function () {
            component.componentData = message.data.componentData;
            _this.modelManager.setItemDirty(component, true);
            _this.syncManager.sync();
        });
    };
    SNComponentManager.prototype.handleToggleComponentMessage = function (sourceComponent, targetComponent, message) {
        this.toggleComponent(targetComponent);
    };
    SNComponentManager.prototype.toggleComponent = function (component) {
        var _this = this;
        if (component.area == 'modal') {
            this.openModalComponent(component);
        }
        else {
            if (component.active) {
                this.deactivateComponent(component);
            }
            else {
                if (component.content_type == 'SN|Theme') {
                    // Deactive currently active theme if new theme is not layerable
                    var activeThemes = this.getActiveThemes();
                    // Activate current before deactivating others, so as not to flicker
                    this.activateComponent(component);
                    if (!component.isLayerable()) {
                        setTimeout(function () {
                            for (var _i = 0, activeThemes_1 = activeThemes; _i < activeThemes_1.length; _i++) {
                                var theme = activeThemes_1[_i];
                                if (theme && !theme.isLayerable()) {
                                    _this.deactivateComponent(theme);
                                }
                            }
                        }, 10);
                    }
                }
                else {
                    this.activateComponent(component);
                }
            }
        }
    };
    SNComponentManager.prototype.handleInstallLocalComponentMessage = function (sourceComponent, message) {
        // Only extensions manager has this permission
        if (this.nativeExtManager &&
            !this.nativeExtManager.isSystemExtension(sourceComponent)) {
            return;
        }
        var targetComponent = this.modelManager.findItem(message.data.uuid);
        this.desktopManager.installComponent(targetComponent);
    };
    SNComponentManager.prototype.runWithPermissions = function (component, requiredPermissions, runFunction) {
        if (!component.permissions) {
            component.permissions = [];
        }
        // Make copy as not to mutate input values
        requiredPermissions = JSON.parse(JSON.stringify(requiredPermissions));
        var acquiredPermissions = component.permissions;
        var _loop_4 = function (required) {
            // Remove anything we already have
            var respectiveAcquired = acquiredPermissions.find(function (candidate) { return candidate.name == required.name; });
            if (!respectiveAcquired) {
                return "continue";
            }
            // We now match on name, lets substract from required.content_types anything we have in acquired.
            var requiredContentTypes = required.content_types;
            if (!requiredContentTypes) {
                // If this permission does not require any content types (i.e stream-context-item)
                // then we can remove this from required since we match by name (respectiveAcquired.name == required.name)
                _.pull(requiredPermissions, required);
                return "continue";
            }
            for (var _i = 0, _a = respectiveAcquired.content_types; _i < _a.length; _i++) {
                var acquiredContentType = _a[_i];
                // console.log("Removing content_type", acquiredContentType, "from", requiredContentTypes);
                _.pull(requiredContentTypes, acquiredContentType);
            }
            if (requiredContentTypes.length == 0) {
                // We've removed all acquired and end up with zero, means we already have all these permissions
                _.pull(requiredPermissions, required);
            }
        };
        for (var _i = 0, _a = requiredPermissions.slice(); _i < _a.length; _i++) {
            var required = _a[_i];
            _loop_4(required);
        }
        if (requiredPermissions.length > 0) {
            this.promptForPermissions(component, requiredPermissions, function (approved) {
                if (approved) {
                    runFunction();
                }
            });
        }
        else {
            runFunction();
        }
    };
    SNComponentManager.prototype.promptForPermissions = function (component, permissions, callback) {
        var _this = this;
        var params = {};
        params.component = component;
        params.permissions = permissions;
        params.permissionsString = this.permissionsStringForPermissions(permissions, component);
        params.actionBlock = callback;
        params.callback = function (approved) {
            if (approved) {
                var _loop_5 = function (permission) {
                    var matchingPermission = component.permissions.find(function (candidate) { return candidate.name == permission.name; });
                    if (!matchingPermission) {
                        component.permissions.push(permission);
                    }
                    else {
                        // Permission already exists, but content_types may have been expanded
                        var contentTypes = matchingPermission.content_types || [];
                        matchingPermission.content_types = _.uniq(contentTypes.concat(permission.content_types));
                    }
                };
                for (var _i = 0, permissions_1 = permissions; _i < permissions_1.length; _i++) {
                    var permission = permissions_1[_i];
                    _loop_5(permission);
                }
                _this.modelManager.setItemDirty(component, true);
                _this.syncManager.sync();
            }
            _this.permissionDialogs = _this.permissionDialogs.filter(function (pendingDialog) {
                // Remove self
                if (pendingDialog == params) {
                    pendingDialog.actionBlock && pendingDialog.actionBlock(approved);
                    return false;
                }
                var containsObjectSubset = function (source, target) {
                    return !target.some(function (val) {
                        return !source.find(function (candidate) { return JSON.stringify(candidate) === JSON.stringify(val); });
                    });
                };
                if (pendingDialog.component == component) {
                    // remove pending dialogs that are encapsulated by already approved permissions, and run its function
                    if (pendingDialog.permissions == permissions ||
                        containsObjectSubset(permissions, pendingDialog.permissions)) {
                        // If approved, run the action block. Otherwise, if canceled, cancel any pending ones as well, since the user was
                        // explicit in their intentions
                        if (approved) {
                            pendingDialog.actionBlock && pendingDialog.actionBlock(approved);
                        }
                        return false;
                    }
                }
                return true;
            });
            if (_this.permissionDialogs.length > 0) {
                _this.presentPermissionsDialog(_this.permissionDialogs[0]);
            }
        };
        // since these calls are asyncronous, multiple dialogs may be requested at the same time. We only want to present one and trigger all callbacks based on one modal result
        var existingDialog = _.find(this.permissionDialogs, {
            component: component
        });
        this.permissionDialogs.push(params);
        if (!existingDialog) {
            this.presentPermissionsDialog(params);
        }
        else {
            console.log('Existing dialog, not presenting.');
        }
    };
    SNComponentManager.prototype.presentPermissionsDialog = function (dialog) {
        console.error('Must override');
    };
    SNComponentManager.prototype.openModalComponent = function (component) {
        console.error('Must override');
    };
    SNComponentManager.prototype.registerHandler = function (handler) {
        this.handlers.push(handler);
    };
    SNComponentManager.prototype.deregisterHandler = function (identifier) {
        var handler = _.find(this.handlers, { identifier: identifier });
        if (!handler) {
            console.log('Attempting to deregister non-existing handler');
            return;
        }
        this.handlers.splice(this.handlers.indexOf(handler), 1);
    };
    // Called by other views when the iframe is ready
    SNComponentManager.prototype.registerComponentWindow = function (component, componentWindow) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (component.window === componentWindow) {
                            if (this.loggingEnabled) {
                                console.log('Web|componentManager', 'attempting to re-register same component window.');
                            }
                        }
                        if (this.loggingEnabled) {
                            console.log('Web|componentManager|registerComponentWindow', component);
                        }
                        component.window = componentWindow;
                        _a = component;
                        return [4 /*yield*/, this.SFJS.crypto.generateUUID()];
                    case 1:
                        _a.sessionKey = _b.sent();
                        this.sendMessageToComponent(component, {
                            action: 'component-registered',
                            sessionKey: component.sessionKey,
                            componentData: component.componentData,
                            data: {
                                uuid: component.uuid,
                                environment: this.environment,
                                platform: this.platform,
                                activeThemeUrls: this.urlsForActiveThemes()
                            }
                        });
                        this.postActiveThemesToComponent(component);
                        if (this.desktopManager) {
                            this.desktopManager.notifyComponentActivation(component);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    SNComponentManager.prototype.activateComponent = function (component, dontSync) {
        if (dontSync === void 0) { dontSync = false; }
        var didChange = component.active != true;
        component.active = true;
        var _loop_6 = function (handler) {
            if (handler.areas.includes(component.area) ||
                handler.areas.includes('*')) {
                // We want to run the handler in a $timeout so the UI updates, but we also don't want it to run asyncronously
                // so that the steps below this one are run before the handler. So we run in a waitTimeout.
                // Update 12/18: We were using this.waitTimeout previously, however, that caused the iframe.onload callback to never be called
                // for some reason for iframes on desktop inside the revision-preview-modal. So we'll use safeApply instead. I'm not quite sure
                // where the original "so the UI updates" comment applies to, but we'll have to keep an eye out to see if this causes problems somewhere else.
                this_2.$uiRunner(function () {
                    handler.activationHandler && handler.activationHandler(component);
                });
            }
        };
        var this_2 = this;
        for (var _i = 0, _a = this.handlers; _i < _a.length; _i++) {
            var handler = _a[_i];
            _loop_6(handler);
        }
        if (didChange && !dontSync) {
            this.modelManager.setItemDirty(component, true);
            this.syncManager.sync();
        }
        if (!this.activeComponents.includes(component)) {
            this.activeComponents.push(component);
        }
        if (component.area == 'themes') {
            this.postActiveThemesToAllComponents();
        }
    };
    SNComponentManager.prototype.deactivateComponent = function (component, dontSync) {
        if (dontSync === void 0) { dontSync = false; }
        var didChange = component.active != false;
        component.active = false;
        component.sessionKey = null;
        var _loop_7 = function (handler) {
            if (handler.areas.includes(component.area) ||
                handler.areas.includes('*')) {
                // See comment in activateComponent regarding safeApply and awaitTimeout
                this_3.$uiRunner(function () {
                    handler.activationHandler && handler.activationHandler(component);
                });
            }
        };
        var this_3 = this;
        for (var _i = 0, _a = this.handlers; _i < _a.length; _i++) {
            var handler = _a[_i];
            _loop_7(handler);
        }
        if (didChange && !dontSync) {
            this.modelManager.setItemDirty(component, true);
            this.syncManager.sync();
        }
        _.pull(this.activeComponents, component);
        this.streamObservers = this.streamObservers.filter(function (o) {
            return o.component !== component;
        });
        this.contextStreamObservers = this.contextStreamObservers.filter(function (o) {
            return o.component !== component;
        });
        if (component.area == 'themes') {
            this.postActiveThemesToAllComponents();
        }
    };
    SNComponentManager.prototype.reloadComponent = function (component) {
        return __awaiter(this, void 0, void 0, function () {
            var _loop_8, this_4, _i, _a, handler;
            var _this = this;
            return __generator(this, function (_b) {
                //
                // Do soft deactivate
                //
                component.active = false;
                _loop_8 = function (handler) {
                    if (handler.areas.includes(component.area) ||
                        handler.areas.includes('*')) {
                        // See comment in activateComponent regarding safeApply and awaitTimeout
                        this_4.$uiRunner(function () {
                            handler.activationHandler && handler.activationHandler(component);
                        });
                    }
                };
                this_4 = this;
                for (_i = 0, _a = this.handlers; _i < _a.length; _i++) {
                    handler = _a[_i];
                    _loop_8(handler);
                }
                this.streamObservers = this.streamObservers.filter(function (o) {
                    return o.component !== component;
                });
                this.contextStreamObservers = this.contextStreamObservers.filter(function (o) {
                    return o.component !== component;
                });
                if (component.area == 'themes') {
                    this.postActiveThemesToAllComponents();
                }
                //
                // Do soft activate
                //
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        _this.$timeout(function () {
                            component.active = true;
                            for (var _i = 0, _a = _this.handlers; _i < _a.length; _i++) {
                                var handler = _a[_i];
                                if (handler.areas.includes(component.area) ||
                                    handler.areas.includes('*')) {
                                    // See comment in activateComponent regarding safeApply and awaitTimeout
                                    _this.$uiRunner(function () {
                                        handler.activationHandler && handler.activationHandler(component);
                                        resolve();
                                    });
                                }
                            }
                            if (!_this.activeComponents.includes(component)) {
                                _this.activeComponents.push(component);
                            }
                            if (component.area == 'themes') {
                                _this.postActiveThemesToAllComponents();
                            }
                            // Resolve again in case first resolve in for loop isn't reached.
                            // Should be no effect if resolved twice, only first will be used.
                            resolve();
                        });
                    })];
            });
        });
    };
    SNComponentManager.prototype.deleteComponent = function (component) {
        this.modelManager.setItemToBeDeleted(component);
        this.syncManager.sync();
    };
    SNComponentManager.prototype.isComponentActive = function (component) {
        return component.active;
    };
    SNComponentManager.prototype.iframeForComponent = function (component) {
        for (var _i = 0, _a = Array.from(document.getElementsByTagName('iframe')); _i < _a.length; _i++) {
            var frame = _a[_i];
            var componentId = frame.dataset.componentId;
            if (componentId === component.uuid) {
                return frame;
            }
        }
    };
    SNComponentManager.prototype.focusChangedForComponent = function (component) {
        var focused = document.activeElement == this.iframeForComponent(component);
        for (var _i = 0, _a = this.handlers; _i < _a.length; _i++) {
            var handler = _a[_i];
            // Notify all handlers, and not just ones that match this component type
            handler.focusHandler && handler.focusHandler(component, focused);
        }
    };
    SNComponentManager.prototype.handleSetSizeEvent = function (component, data) {
        var setSize = function (element, size) {
            var widthString = typeof size.width === 'string' ? size.width : data.width + "px";
            var heightString = typeof size.height === 'string' ? size.height : data.height + "px";
            if (element) {
                element.setAttribute('style', "width:" + widthString + "; height:" + heightString + ";");
            }
        };
        if (component.area == 'rooms' || component.area == 'modal') {
            var selector = component.area == 'rooms' ? 'inner' : 'outer';
            var content = document.getElementById("component-content-" + selector + "-" + component.uuid);
            if (content) {
                setSize(content, data);
            }
        }
        else {
            var iframe = this.iframeForComponent(component);
            if (!iframe) {
                return;
            }
            setSize(iframe, data);
            // On Firefox, resizing a component iframe does not seem to have an effect with editor-stack extensions.
            // Sizing the parent does the trick, however, we can't do this globally, otherwise, areas like the note-tags will
            // not be able to expand outside of the bounds (to display autocomplete, for example).
            if (component.area == 'editor-stack') {
                var parent_1 = iframe.parentElement;
                if (parent_1) {
                    setSize(parent_1, data);
                }
            }
            // content object in this case is === to the iframe object above. This is probably
            // legacy code from when we would size content and container individually, which we no longer do.
            // var content = document.getElementById(`component-iframe-${component.uuid}`);
            // console.log("content === iframe", content == iframe);
            // if(content) {
            //   setSize(content, data);
            // }
        }
    };
    SNComponentManager.prototype.editorForNote = function (note) {
        var editors = this.componentsForArea('editor-editor');
        for (var _i = 0, editors_1 = editors; _i < editors_1.length; _i++) {
            var editor = editors_1[_i];
            if (editor.isExplicitlyEnabledForItem(note)) {
                return editor;
            }
        }
        // No editor found for note. Use default editor, if note does not prefer system editor
        if (this.isMobile) {
            if (!note.content.mobilePrefersPlainEditor) {
                return this.getDefaultEditor();
            }
        }
        else {
            if (!note.getAppDataItem('prefersPlainEditor')) {
                return editors.filter(function (e) {
                    return e.isDefaultEditor();
                })[0];
            }
        }
    };
    SNComponentManager.prototype.getDefaultEditor = function () {
        throw new Error('Method not implemented.');
    };
    SNComponentManager.prototype.permissionsStringForPermissions = function (permissions, component) {
        var _this = this;
        var finalString = '';
        var permissionsCount = permissions.length;
        var addSeparator = function (index, length) {
            if (index > 0) {
                if (index == length - 1) {
                    if (length == 2) {
                        return ' and ';
                    }
                    else {
                        return ', and ';
                    }
                }
                else {
                    return ', ';
                }
            }
            return '';
        };
        permissions.forEach(function (permission, index) {
            if (permission.name === 'stream-items') {
                var types = permission.content_types.map(function (type) {
                    var desc = _this.modelManager.humanReadableDisplayForContentType(type);
                    if (desc) {
                        return desc + 's';
                    }
                    else {
                        return 'items of type ' + type;
                    }
                });
                var typesString = '';
                for (var i = 0; i < types.length; i++) {
                    var type = types[i];
                    typesString += addSeparator(i, types.length + permissionsCount - index - 1);
                    typesString += type;
                }
                finalString += addSeparator(index, permissionsCount);
                finalString += typesString;
                if (types.length >= 2 && index < permissionsCount - 1) {
                    // If you have a list of types, and still an additional root-level permission coming up, add a comma
                    finalString += ', ';
                }
            }
            else if (permission.name === 'stream-context-item') {
                var mapping = {
                    'editor-stack': 'working note',
                    'note-tags': 'working note',
                    'editor-editor': 'working note'
                };
                finalString += addSeparator(index, permissionsCount);
                finalString += mapping[component.area];
            }
        });
        return finalString + '.';
    };
    /* This domain will be used to save context item client data */
    SNComponentManager.ClientDataDomain = 'org.standardnotes.sn.components';
    return SNComponentManager;
}());
export { SNComponentManager };
//# sourceMappingURL=componentManager.js.map