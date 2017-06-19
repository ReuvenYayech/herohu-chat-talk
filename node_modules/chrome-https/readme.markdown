# chrome-https

This is a fork of https://www.npmjs.com/package/stream-http 

There are two reasons for the fork

1. A call to `https.request` with an options parameter without a scheme but with a port throws an error in chrome-apps

2. The default https-browserify `inherits` the all the calls from which ever `http` is required but with the scheme change. 
This breaks in chromiumify as[the full http stack](https://github.com/jscissr/http-node) guards against using the incorrect protocol.

So to use the [https](https://nodejs.org/api/https.html) module from node.js in chrome apps the [stream-http](https://www.npmjs.com/package/stream-http) module 
has been taken, the [scheme update applied](https://github.com/No9/chrome-https/blob/master/http.js), and published as [chome-https](https://www.npmjs.com/package/chrome-https).

When you `require('https')` in a
[chromiumify](http://github.com/chromiumify/chromiumify) app, this module will be loaded.

# example

``` js
var https = require('https');

var options = {
  hostname: 'encrypted.google.com',
  port: 443,
  path: '/',
  method: 'GET'
};

var req = https.request(options, function(res) {
  console.log("statusCode: ", res.statusCode);
  console.log("headers: ", res.headers);

  res.on('data', function(d) {
    process.stdout.write(d);
  });
});
req.end();

req.on('error', function(e) {
  console.error(e);
});
```

# http methods

var https = require('https');

## var req = https.request(opts, cb)

where `opts` are:

* `opts.method='GET'` - http method verb
* `opts.path` - path string, example: `'/foo/bar?baz=555'`
* `opts.headers={}` - as an object mapping key names to string or Array values
* `opts.host=window.location.host` - http host
* `opts.port=window.location.port` - http port
* `opts.responseType` - response type to set on the underlying xhr object

The callback will be called with the response object.

## var req = https.get(options, cb)

A shortcut for

``` js
options.method = 'GET';
var req = https.request(options, cb);
req.end();
```

# request methods

## req.setHeader(key, value)

Set an http header.

## req.getHeader(key)

Get an http header.

## req.removeHeader(key)

Remove an http header.

## req.write(data)

Write some data to the request body.

If only 1 piece of data is written, `data` can be a FormData, Blob, or
ArrayBuffer instance. Otherwise, `data` should be a string or a buffer.

## req.end(data)

Close and send the request body, optionally with additional `data` to append.

# response methods

## res.getHeader(key)

Return an http header, if set. `key` is case-insensitive.

# response attributes

* res.statusCode, the numeric http response code
* res.headers, an object with all lowercase keys


in order to map "chrome-https" over `require('https')` in your browserified
source.

# install

With [npm](https://npmjs.org) do:

```
npm install chrome-https
```

# license

MIT
