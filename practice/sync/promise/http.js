/**
 * 举个🌰，XMLHttpRequest 的封装
 */
class $http {
    constructor(url){
        if(!url) throw new Error('http must have a url!')
        this._url = url
    }
    _ajax(method, url, args) {
        // Creating a promise
        var promise = new Promise( function (resolve, reject) {
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
    get(args) {
        return this._ajax('GET', this._url, args);
    }
    post(args) {
        return this._ajax('POST', this._url, args);
    }
    put(args) {
        return this._ajax('PUT', this._url, args);
    }
    delete(args) {
        return this._ajax('DELETE', this._url, args);
    }
}
const mdnAPI = './data/story.json'
const payload = {
    'topic' : 'js',
    'q'     : 'Promise'
}

let callback = {
    success: function(data) {
        console.log(1, 'success', JSON.parse(data));
    },
    error: function(data) {
        console.log(2, 'error', JSON.parse(data));
    }
}

// Executes the method call
new $http(mdnAPI).get(payload).then(callback.success).catch(callback.error);

// Executes the method call but an alternative way (1) to handle Promise Reject case
new $http(mdnAPI).get(payload).then(callback.success, callback.error);

// Executes the method call but an alternative way (2) to handle Promise Reject case
new $http(mdnAPI).get(payload).then(callback.success).then(undefined, callback.error);
