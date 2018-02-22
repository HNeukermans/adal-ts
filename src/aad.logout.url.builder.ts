import { GuidGenerator } from './guid.generator';
import { AadUrlConfig } from './aad.url.config';
import { EndpointVersion, Constants } from './constants';
export class AadLogoutUrlBuilder {

    private tenant: string;
    private postLogoutRedirectUri: string;
    private endpointVersion: EndpointVersion;

    public static MicrosoftLoginUrl: string = 'https://login.microsoftonline.com/';

    constructor() {
        this.postLogoutRedirectUri = window.location.href;
        this.endpointVersion = EndpointVersion.V1;
    }

    public with(tenant: string, postLogoutRedirectUri?: string, endpointVersion?: EndpointVersion): AadLogoutUrlBuilder {
        this.tenant = tenant;
        this.postLogoutRedirectUri = postLogoutRedirectUri || this.postLogoutRedirectUri;
        this.endpointVersion = endpointVersion || this.endpointVersion;
        return this;
    }

    public build() {

        let urlNavigate = AadLogoutUrlBuilder.MicrosoftLoginUrl + this.tenant + '/oauth2/' + Constants.ENDPOINT_TO_URL_PART_MAP[this.endpointVersion] + 'logout?';

        urlNavigate = urlNavigate + 'post_logout_redirect_uri=' + encodeURIComponent(this.postLogoutRedirectUri);

        return urlNavigate;
    }
}