'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * 举个🌰，XMLHttpRequest 的封装
 */

var $http = function () {
    function $http(url) {
        _classCallCheck(this, $http);

        if (!url) throw new Error('http must have a url!');
        this._url = url;
    }

    _createClass($http, [{
        key: '_ajax',
        value: function _ajax(method, url, args) {
            // Creating a promise
            var promise = new Promise(function (resolve, reject) {
                // Instantiates the XMLHttpRequest
                var client = new XMLHttpRequest();
                var uri = url;
                if (args && (method === 'POST' || method === 'PUT')) {
                    uri += '?';
                    var argcount = 0;
                    for (var key in args) {
                        if (args.hasOwnProperty(key)) {
                            if (argcount++) {
                                uri += '&';
                            }
                            uri += encodeURIComponent(key) + '=' + encodeURIComponent(args[key]);
                        }
                    }
                }
                client.open(method, uri);
                client.send();
                client.onload = function () {
                    if (this.status >= 200 && this.status < 300) {
                        // Performs the function "resolve" when this.status is equal to 2xx
                        resolve(this.response);
                    } else {
                        // Performs the function "reject" when this.status is different than 2xx
                        reject(this.statusText);
                    }
                };
                client.onerror = function () {
                    reject(this.statusText);
                };
            });
            // Return the promise
            return promise;
        }
    }, {
        key: 'get',
        value: function get(args) {
            return this._ajax('GET', this._url, args);
        }
    }, {
        key: 'post',
        value: function post(args) {
            return this._ajax('POST', this._url, args);
        }
    }, {
        key: 'put',
        value: function put(args) {
            return this._ajax('PUT', this._url, args);
        }
    }, {
        key: 'delete',
        value: function _delete(args) {
            return this._ajax('DELETE', this._url, args);
        }
    }]);

    return $http;
}();

var mdnAPI = './data/story.json';
var payload = {
    'topic': 'js',
    'q': 'Promise'
};

var callback = {
    success: function success(data) {
        console.log(1, 'success', JSON.parse(data));
    },
    error: function error(data) {
        console.log(2, 'error', JSON.parse(data));
    }
};

// Executes the method call
new $http(mdnAPI).get(payload).then(callback.success).catch(callback.error);

// Executes the method call but an alternative way (1) to handle Promise Reject case
new $http(mdnAPI).get(payload).then(callback.success, callback.error);

// Executes the method call but an alternative way (2) to handle Promise Reject case
new $http(mdnAPI).get(payload).then(callback.success).then(undefined, callback.error);
