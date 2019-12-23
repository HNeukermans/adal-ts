// all optional properties have generated defaults
export interface AadUrlConfig {
  instance?: string;
  tenant: string;
  /** The AD B2C login policy */
  signinPolicy?: string;
  nonce?: string;
  clientId: string;
  responseType?: string;
  redirectUri?: string;
  state?: string;
  slice?: string;
  clientRequestId?: string;
  libVersion?: string;
  extraQueryParameter?: string;
  scope?: string;
}
