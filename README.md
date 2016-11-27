# adal-ts
A typescript library that allows you to authenticate against Azure Active Directory

aka adal.js typescript rewrite

## technical features:
 1. 100% typescript
 2. 80% code coverage
 3. easy to install, no depedencies.


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


## Issue Reporting

If you have found a bug or if you have a feature request, please report them at this repository issues section. Please do not report security vulnerabilities on the public GitHub issue tracker. The [Responsible Disclosure Program](https://auth0.com/whitehat) details the procedure for disclosing security issues.

## Contributing

Pull requests are welcome!

## Development

Use `npm run dev` to compile and watch for changes.

## Code coverage

Use `npm test` to compile and run all tests. After the tests have run a /coverage folder is generated. Drill down to index.html to see the results.

## Unit testing

Use `npm test` to compile and run all tests. Test runner is configured with autowatching and 'progress' as test reporter. 
  