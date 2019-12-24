export class AdalConfig {
  public resource?: string;
  constructor(
    public tenant: string,
    public clientId: string,
    public redirectUri: string,
    public instance?: string,
    public signinPolicy?: string,
    public postLogoutRedirectUrl?: string,
    public responseType?: string,
    public extraQueryParameter?: string,
    public scope?: Array<string>
  ) {}
}
