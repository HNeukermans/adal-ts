# extended-define-webpack-plugin
Extended version of webpack.DefinePlugin

## Installation
```
npm install extended-define-webpack-plugin --save-dev
```

## Example Usage
We want to inject a configuration object and use it in our code.
```js
// app.config.js
module.exports = {
    api_key: '1234567890ABCDEFG'
    fb_conf: {
      use_social: true,
      api_key: '123456790'
    }
};
```

We use the `ExtendedDefinePlugin` in our webpack configuration like this:
```js
// webpack.config.js

var ExtendedDefinePlugin = require('extended-define-webpack-plugin');
var appConfig = require('./app.config.js');

module.exports = {
  // ...
  plugins: [
    /* ..., */
    new ExtendedDefinePlugin({
      APP_CONFIG: appConfig,
    })
  ]
};
```

In our client code we can just use it!
```js
// main.js

// ...

var server_api_key = APP_CONFIG.api_key;

// ...

if (APP_CONFIG.fb_conf.use_social) {
  var fb_api_key = APP_CONFIG.fb_conf.api_key;
}

// ...
```

## Output
The example above will produce this output:
```js
// main.js

// ...

var server_api_key = ('1234567890ABCDEFG');

// ...

if ((true)) {
  var fb_api_key = ('123456790');
}

// ...
```
