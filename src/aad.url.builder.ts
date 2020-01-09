/* eslint-disable @typescript-eslint/no-explicit-any */

import { AadUrlConfig } from './aad.url.config';
import { GuidGenerator } from './guid.generator';

const urlJoins = (...values: string[]) =>
  values.reduce((p: string, c: string) => {
    if (typeof p !== 'string') return c;
    if (typeof c !== 'string') return p;
    return p.endsWith('/') || c.startsWith('/') ? p + c : p + '/' + c;
  });

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
  private endpointVersion!: string;

  public static MicrosoftLoginUrl = 'https://login.microsoftonline.com/';
  public static V1_END_POINT = 'oauth2/authorize';
  public static V2_END_POINT = 'oauth2/v2.0/authorize';

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
    this.endpointVersion = options.endpointVersion || AadUrlBuilder.V2_END_POINT;

    return this;
  }

  public build() {
    let urlNavigate = this.signinPolicy
      ? urlJoins(this.instance, this.tenant, this.signinPolicy, this.endpointVersion)
      : urlJoins(this.instance, this.tenant, this.endpointVersion);

    urlNavigate += this.serialize() + this.addLibMetadata();
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

    if(this.scope){
      str.push('scope=' + this.scope);
    }else str.push('scope=openid');
    

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
