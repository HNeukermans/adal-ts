# adal-ts
A typescript library that allows you to authenticate against Azure Active Directory

aka adal.js typescript rewrite

## Installation
```
npm install adal-ts --save
```


## adal-ts does three things:
 1. login to Azure Active Directory
 2. get the logged in user
 3. logout to Azure Active Directory

## Example Usage

### login
```
let config = new AdalConfig('clientID', 'unittest.onmicrosoft.com', 'http://localhost');
let context = Authentication.getContext(config);
context.login();
...
//to process the redirect after login, place this inside your root component  (ex: NG2 AppComponent.ngOnInit)
Authentication.getAadRedirectProcessor().process();
```

### get the currently logged in user
```
let config = new AdalConfig('clientID', 'unittest.onmicrosoft.com', 'http://localhost');
let context = Authentication.getContext(config);
let user = context.getUser();

```

### logout
```
let config = new AdalConfig('clientID', 'unittest.onmicrosoft.com', 'http://localhost');
let context = Authentication.getContext(config);
let user = context.logout();

```
