"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var HttpManager = /** @class */ (function () {
    function HttpManager() {
    }
    HttpManager.get = function () {
        if (!this.instance) {
            this.instance = new HttpManager();
        }
        return this.instance;
    };
    HttpManager.prototype.postAbsolute = function (url, params, onsuccess, onerror) {
        this.httpRequest('post', url, params, onsuccess, onerror);
    };
    HttpManager.prototype.patchAbsolute = function (url, params, onsuccess, onerror) {
        this.httpRequest('patch', url, params, onsuccess, onerror);
    };
    HttpManager.prototype.getAbsolute = function (url, params, onsuccess, onerror) {
        this.httpRequest('get', url, params, onsuccess, onerror);
    };
    HttpManager.prototype.httpRequest = function (verb, url, params, onsuccess, onerror) {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState === 4) {
                var response = xmlhttp.responseText;
                if (response) {
                    try {
                        response = JSON.parse(response);
                    }
                    catch (e) {
                        // Not JSON
                    }
                }
                if (xmlhttp.status >= 200 && xmlhttp.status <= 299) {
                    onsuccess(response);
                }
                else {
                    console.error('Request error:', response);
                    onerror(response);
                }
            }
        };
        if (verb === 'get' && Object.keys(params).length > 0) {
            url = url + this.formatParams(params);
        }
        xmlhttp.open(verb, url, true);
        xmlhttp.setRequestHeader('Content-type', 'application/json');
        if (verb === 'post' || verb === 'patch') {
            xmlhttp.send(JSON.stringify(params));
        }
        else {
            xmlhttp.send();
        }
    };
    HttpManager.prototype.formatParams = function (params) {
        return ('?' +
            Object.keys(params)
                .map(function (key) {
                return key + '=' + encodeURIComponent(params[key]);
            })
                .join('&'));
    };
    return HttpManager;
}());
exports.default = HttpManager;
//# sourceMappingURL=httpManager.js.map