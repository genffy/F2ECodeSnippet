/**
 * promise 是ES6中的一个标准，Promise 对象代表一个异步操作，有三种状态：Pending、Resoved 和 Rejected，
 * 其状态是不可逆的。
 * 
 * 主要特点是
 * 1) 对象的状态不受外界影响
 * 2) 一旦状态改变，就不会再变，任何时候都可以得到这个结果
 *
 * @/// <reference path="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise" />
 * @/// <reference path="http://es6.ruanyifeng.com/#docs/promise" />
 */


// 举个🌰，XMLHttpRequest 的封装
'use strict';

// A-> $http function is implemented in order to follow the standard Adapter pattern
function $http(url){
 
  // A small example of object
  var core = {

    // Method that performs the ajax request
    ajax: function (method, url, args) {

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
  };

  // Adapter pattern
  return {
    'get': function(args) {
      return core.ajax('GET', url, args);
    },
    'post': function(args) {
      return core.ajax('POST', url, args);
    },
    'put': function(args) {
      return core.ajax('PUT', url, args);
    },
    'delete': function(args) {
      return core.ajax('DELETE', url, args);
    }
  };
};
// End A

// B-> Here you define its functions and its payload
var mdnAPI = 'https://developer.mozilla.org/en-US/search.json';
var payload = {
  'topic' : 'js',
  'q'     : 'Promise'
};

var callback = {
  success: function(data) {
    console.log(1, 'success', JSON.parse(data));
  },
  error: function(data) {
    console.log(2, 'error', JSON.parse(data));
  }
};
// End B

// Executes the method call 
$http(mdnAPI) 
  .get(payload) 
  .then(callback.success) 
  .catch(callback.error);

// Executes the method call but an alternative way (1) to handle Promise Reject case 
$http(mdnAPI) 
  .get(payload) 
  .then(callback.success, callback.error);

// Executes the method call but an alternative way (2) to handle Promise Reject case 
$http(mdnAPI) 
  .get(payload) 
  .then(callback.success)
  .then(undefined, callback.error);

	/**
	 * 关于 Promise 的一些早期实现
	 * Q when WinJS RSVP.js
	 * @/// <reference path="http://www.html5rocks.com/zh/tutorials/es6/promises/" />
	 */



	/**
	 * some problems
	 * @/// <reference path="https://pouchdb.com/2015/05/18/we-have-a-problem-with-promises.html" />
	 */