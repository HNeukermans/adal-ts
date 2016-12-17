export class AdalConfig {
    constructor(public clientId: string, public tenant: string, public redirectUri: string, public postLogoutRedirectUrl?: string) {
    };
}