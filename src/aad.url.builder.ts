/* eslint-disable @typescript-eslint/no-explicit-any */

import { AadUrlConfig } from './aad.url.config';
import { GuidGenerator } from './guid.generator';

export class AadUrlBuilder {
  private instance!: string;
  private tenant!: string;
  private signinPolicy?: string;
  private nonce?: string;
  private responseType: string;
  private clientId!: string;
  private resource!: string;
  private redirectUri: string;
  private state: string;
  private slice!: string;
  private clientRequestId: string;
  private libVersion: string;
  private extraQueryParameter!: string;
  private guidGenerator: GuidGenerator;
  private scope?: string;
  public static MicrosoftLoginUrl = 'https://login.microsoftonline.com/';

  constructor(guidGenerator: GuidGenerator) {
    this.guidGenerator = guidGenerator;

    this.state = this.guidGenerator.generate();
    this.clientRequestId = this.guidGenerator.generate();
    this.responseType = 'id_token';
    this.libVersion = '1.0.0';
    this.redirectUri = window.location.href;
  }

  public with(options: AadUrlConfig): AadUrlBuilder {
    this.instance = options.instance ?? AadUrlBuilder.MicrosoftLoginUrl;
    this.tenant = options.tenant;
    this.signinPolicy = options.signinPolicy;
    this.nonce = options.nonce ?? 'defaultNonce';
    this.clientId = options.clientId;
    this.responseType = options.responseType || this.responseType;
    this.redirectUri = options.redirectUri || this.redirectUri;
    this.state = options.state || this.state;
    this.slice = options.slice || this.slice;
    this.clientRequestId = options.clientRequestId || this.clientRequestId;
    this.libVersion = options.libVersion || this.libVersion;
    this.extraQueryParameter = options.extraQueryParameter || this.extraQueryParameter;
    this.scope = options.scope;

    return this;
  }

  public build() {
    let urlNavigate = this.signinPolicy
      ? this.instance + this.tenant + '/' + this.signinPolicy + '/oauth2/v2.0/authorize'
      : this.instance + this.tenant + '/oauth2/authorize';
    urlNavigate = urlNavigate + this.serialize() + this.addLibMetadata();
    debugger;
    return urlNavigate;
  }

  private serialize(): string {
    const str = new Array<string>();
    str.push('?response_type=' + this.responseType);

    str.push('client_id=' + encodeURIComponent(this.clientId));
    if (this.resource) {
      str.push('resource=' + encodeURIComponent(this.resource));
    }

    str.push('redirect_uri=' + encodeURIComponent(this.redirectUri));

    if (this.state) {
      str.push('state=' + encodeURIComponent(this.state));
    }

    str.push('client-request-id=' + encodeURIComponent(this.clientRequestId));

    if (this.slice) {
      str.push('slice=' + encodeURIComponent(this.slice));
    }

    if (this.nonce) {
      str.push('nonce=' + this.nonce);
    }

    if (!this.scope && this.signinPolicy) {
      str.push('scope=openid');
    }

    if (this.extraQueryParameter) {
      str.push(this.extraQueryParameter);
    }

    return str.join('&');
  }

  private addLibMetadata = () => {
    // x-client-SKU
    // x-client-Ver
    return '&x-client-SKU=Js&x-client-Ver=' + this.libVersion;
  };
}
