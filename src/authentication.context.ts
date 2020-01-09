/* eslint-disable @typescript-eslint/no-explicit-any */

import { AadLogoutUrlBuilder } from './aad.logout.url.builder';
import { AadUrlBuilder } from './aad.url.builder';
import { AadUrlConfig } from './aad.url.config';
import { AdalConfig } from './adal.config';
import { Constants } from './constants';
import { GuidGenerator } from './guid.generator';
import { Navigator } from './navigator';
import { Storage } from './storage';
import { User } from './user';
import { UserDecoder } from './user.decoder';

export class AuthenticationContext {
  private idTokenNonce!: string;
  //private instance!: string;
  public loginInProgress!: boolean;
  private config: AdalConfig;
  private storage: Storage;
  private navigator: Navigator;
  private guidGenerator: GuidGenerator;
  private aadUrlBuilder: AadUrlBuilder;
  private userDecoder: UserDecoder;
  private logoutUrlBuilder: AadLogoutUrlBuilder;
  private CONSTANTS = Constants;
  //private REQUEST_TYPES = RequestTypes;

  constructor(
    config: AdalConfig,
    storage: Storage,
    navigator: Navigator,
    guidGenerator: GuidGenerator,
    aadUrlBuilder: AadUrlBuilder,
    userDecoder: UserDecoder,
    logoutUrlBuilder: AadLogoutUrlBuilder
  ) {
    this.storage = storage;
    this.navigator = navigator;
    this.config = config;
    this.guidGenerator = guidGenerator;
    this.aadUrlBuilder = aadUrlBuilder;
    this.userDecoder = userDecoder;
    this.logoutUrlBuilder = logoutUrlBuilder;
  }

  public login(): void {
    if (this.loginInProgress) {
      this.info('Login in progress');
      return;
    }

    const urlConfig = this.cloneConfig(this.config);
    urlConfig.nonce = this.guidGenerator.generate();
    urlConfig.state = this.guidGenerator.generate();

    this.verbose('Expected state: ' + urlConfig.state + ' startPage:' + window.location);
    this.storage.setItem(this.CONSTANTS.STORAGE.LOGIN_REQUEST, (window as any).location);
    this.storage.setItem(this.CONSTANTS.STORAGE.STATE_LOGIN, urlConfig.state);
    this.storage.setItem(this.CONSTANTS.STORAGE.NONCE_IDTOKEN, urlConfig.nonce);
    this.storage.setItem(this.CONSTANTS.STORAGE.LOGIN_ERROR, '');
    this.storage.setItem(this.CONSTANTS.STORAGE.ERROR, '');
    this.storage.setItem(this.CONSTANTS.STORAGE.ERROR_DESCRIPTION, '');

    const url = this.aadUrlBuilder.with(urlConfig).build();

    this.navigator.navigate(url);

    this.loginInProgress = true;
  }

  public getUser(): User | null {
    const idtoken =
      this.storage.getItem(Constants.STORAGE.IDTOKEN) || this.storage.getItem(Constants.STORAGE.ACCESSTOKEN);
    try {
      if (idtoken) return this.userDecoder.decode(idtoken);
    } catch (error) {
      if (console && console.debug)
        console.debug('getUser() returns null on catched error. Details >> ' + error.toString());
    }
    return null;
  }

  public getToken(): string | null {
    return (
      this.storage.getItem(Constants.STORAGE.IDTOKEN) || this.storage.getItem(Constants.STORAGE.ACCESSTOKEN)
    );
  }

  public logout(): void {
    if (this.getToken() === '') return;

    this.storage.setItem(this.CONSTANTS.STORAGE.NONCE_IDTOKEN, '');
    this.storage.setItem(this.CONSTANTS.STORAGE.STATE_LOGIN, '');
    this.storage.setItem(this.CONSTANTS.STORAGE.IDTOKEN, '');
    this.storage.setItem(this.CONSTANTS.STORAGE.ACCESSTOKEN, '');

    const url = this.logoutUrlBuilder.with(this.config.tenant, this.config.postLogoutRedirectUrl).build();

    this.navigator.navigate(url);
  }

  private verbose(message: string): void {
    //ignore
  }

  private info(message: string): void {
    //ignore
  }

  private createOptions(): any {
    return {
      nonce: this.idTokenNonce,
      tenant: this.config.tenant,
      clientId: this.config.clientId
    };
  }

  private cloneConfig(obj: AdalConfig):AadUrlConfig {
    if (null === obj || 'object' !== typeof obj) {
      return undefined;
    }
    return {...obj,scope:Array.isArray( obj.scope)?obj.scope.join(" "):obj.scope};
  }
}
