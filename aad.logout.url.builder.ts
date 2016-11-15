import { GuidGenerator } from './guid.generator';
import { AadUrlConfig } from './AadUrlConfig';
export class AadLogoutUrlBuilder {

    private tenant: string;
    private postLogoutRedirectUri: string;
    public static MicrosoftLoginUrl: string = 'https://login.microsoftonline.com/';

    constructor() {
        this.postLogoutRedirectUri = window.location.href;
    }

    public with(tenant: string, postLogoutRedirectUri?: string): AadLogoutUrlBuilder {
        this.tenant = tenant;
        this.postLogoutRedirectUri = postLogoutRedirectUri || this.postLogoutRedirectUri;
        return this;
    }

    public build() {

        let urlNavigate = AadLogoutUrlBuilder.MicrosoftLoginUrl + this.tenant + '/oauth2/logout?';

        urlNavigate = urlNavigate + 'post_logout_redirect_uri=' + encodeURIComponent(this.postLogoutRedirectUri);

        return urlNavigate;
    }
}