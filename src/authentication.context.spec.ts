/// <reference path="./../node_modules/@types/jasmine/index.d.ts" />
import { AuthenticationContext } from './authentication.context';
import { LocalStorage } from './local.storage';
import { Navigator } from './navigator';
import { AadUrlBuilder } from './aad.url.builder';
import { AadLogoutUrlBuilder } from './aad.logout.url.builder';
import { GuidGenerator } from './guid.generator';
import { UserDecoder } from './user.decoder';
import { Constants } from './constants';
import { ATenantConfig, ATenantUrl } from './scenario/a.production.adal.config';
import {
  AadProductionTokenSample,
  AadProductionUserProfileSample
} from './scenario/a.production.aad.response';
import * as _ from 'lodash';
import { AdalConfig } from './adal.config';

let config: AdalConfig;
let localStorage: LocalStorage;
let navigator: Navigator;
let guidGenerator: GuidGenerator;
let aadUrlBuilder: AadUrlBuilder;
let aadLogoutUrlBuilder: AadLogoutUrlBuilder;
let userDecoder: UserDecoder;
let sut: AuthenticationContext;

describe('AuthenticationContext', () => {
  'use strict';

  beforeEach(() => {
    config = ATenantConfig;
    localStorage = new LocalStorage();
    navigator = new Navigator();
    guidGenerator = new GuidGenerator();
    aadUrlBuilder = new AadUrlBuilder(guidGenerator);
    aadLogoutUrlBuilder = new AadLogoutUrlBuilder();
    userDecoder = new UserDecoder();
  });

  beforeEach(() => {
    sut = new AuthenticationContext(
      config,
      localStorage,
      navigator,
      guidGenerator,
      aadUrlBuilder,
      userDecoder,
      aadLogoutUrlBuilder
    );
  });

  it('login should build the url', () => {
    spyOn(navigator, 'navigate');
    spyOn(aadUrlBuilder, 'with').and.callThrough();
    spyOn(aadUrlBuilder, 'build').and.callThrough();

    sut.login();

    expect(aadUrlBuilder.with).toHaveBeenCalledWith(jasmine.objectContaining(config));
    expect(aadUrlBuilder.build).toHaveBeenCalled();
  });

  it('login should navigate to aad url', () => {
    spyOn(navigator, 'navigate');
    spyOn(guidGenerator, 'generate').and.returnValue('xxx');

    sut.login();

    expect(navigator.navigate).toHaveBeenCalled();
    // expect(navigator.navigate).toHaveBeenCalledWith(ATenantUrl); //should create a  specific matcher gfor this
  });

  it('login should store its state', () => {
    spyOn(localStorage, 'setItem');
    spyOn(guidGenerator, 'generate').and.returnValue('xxx');
    spyOn(navigator, 'navigate');
    sut.login();

    expect((localStorage.setItem as any).calls.argsFor(0)).toEqual(
      jasmine.arrayContaining([Constants.STORAGE.LOGIN_REQUEST])
    );
    expect((localStorage.setItem as any).argsFor(1)).toEqual([Constants.STORAGE.STATE_LOGIN, 'xxx']);
    expect((localStorage.setItem as any).argsFor(2)).toEqual([Constants.STORAGE.NONCE_IDTOKEN, 'xxx']);
    expect((localStorage.setItem as any).argsFor(3)).toEqual([Constants.STORAGE.LOGIN_ERROR, '']);
    expect((localStorage.setItem as any).argsFor(4)).toEqual([Constants.STORAGE.ERROR, '']);
    expect((localStorage.setItem as any).argsFor(5)).toEqual([Constants.STORAGE.ERROR_DESCRIPTION, '']);
  });

  it('getUser should decode idtoken in the storage ', () => {
    spyOn(localStorage, 'setItem').and.callFake(() => {
      return AadProductionTokenSample;
    });
    spyOn(userDecoder, 'decode').and.callThrough();

    let user = sut.getUser();

    expect(userDecoder.decode).toHaveBeenCalledWith(AadProductionTokenSample);
    expect(user).toEqual(AadProductionUserProfileSample);
  });

  it('getUser should return null if idtoken is empty', () => {
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return '';
    });

    let user = sut.getUser();

    expect(user).toBe(null);
  });

  it('getUser should return null if idtoken is undefined', () => {
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return;
    });

    let user = sut.getUser();
    expect(user).toBe(null);
  });

  it('getUser should return null if idtoken is null', () => {
    spyOn(localStorage, 'getItem').and.callFake(function() {
      return <any>null;
    });
    let user = sut.getUser();

    expect(user).toBe(null);
  });

  it('getUser should return null if idtoken is null', () => {
    spyOn(localStorage, 'getItem').and.callFake(function() {
      return '    ';
    });
    let user = sut.getUser();

    expect(user).toBe(null);
  });

  it('logout should clear state ', () => {
    spyOn(localStorage, 'setItem');
    spyOn(navigator, 'navigate');

    sut.logout();

    expect((localStorage.setItem as any).argsFor(0)).toEqual([Constants.STORAGE.NONCE_IDTOKEN, '']);
    expect((localStorage.setItem as any).argsFor(1)).toEqual([Constants.STORAGE.STATE_LOGIN, '']);
    expect((localStorage.setItem as any).argsFor(2)).toEqual([Constants.STORAGE.IDTOKEN, '']);
  });

  it('logout should build url and navigate', () => {
    spyOn(aadLogoutUrlBuilder, 'with').and.callThrough();
    spyOn(aadLogoutUrlBuilder, 'build').and.returnValue('http://microsoft.com');
    spyOn(navigator, 'navigate');

    sut.logout();

    expect(aadLogoutUrlBuilder.with).toHaveBeenCalledWith(config.tenant, config.postLogoutRedirectUrl);
    expect(aadLogoutUrlBuilder.build).toHaveBeenCalled();
    expect(navigator.navigate).toHaveBeenCalledWith('http://microsoft.com');
  });

  it('getToken should call localStorage twice', () => {
    spyOn(localStorage, 'getItem');
    spyOn(navigator, 'navigate');

    sut.getToken();
    expect(localStorage.getItem).toHaveBeenCalledWith(Constants.STORAGE.IDTOKEN);
    expect(localStorage.getItem).toHaveBeenCalledWith(Constants.STORAGE.ACCESSTOKEN);
    expect(localStorage.getItem).toHaveBeenCalledTimes(2);
  });
});
