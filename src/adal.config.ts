export class AdalConfig {
    public resource: string;
    constructor(public tenant: string,
                public clientId: string,
                public responseType: string,
                public redirectUri: string,
                public scope: string,
                public response_mode?: string,
                public state?: string,
                public nonce?: string,
                public prompt?: string,
                public login_hint?: string,
                public domain_hint?: string,
                public postLogoutRedirectUrl?: string) {
    };
}