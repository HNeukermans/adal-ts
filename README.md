# adal-ts
Adal.js typescript rewrite

## Installation
```
npm install ... --save-dev == work in progress
```

## Example Usage

```
let config = new AdalConfig('clientID', 'unittest.onmicrosoft.com', 'http://localhost');
let context = Authentication.getContext(config);
context.login();

```
