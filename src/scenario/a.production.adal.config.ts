import { AdalConfig } from '../adal.config';

export const ATenantConfig = new AdalConfig('unittest.onmicrosoft.com', '61bdbb45-4004-48e3-4444-e4f1740661c8', 'http://localhost/login', 'id_token', 'openid', 'fragment', '', '', 'http://localhost/logout');
export const ATenantConfig_AcessToken = new AdalConfig('friden.onmicrosoft.com', '0113255e-cecc-4ad1-b101-08822ea5d0da', 'http://localhost:4200', 'token', 'openid', 'fragment', '', 'resource=https://friden.sharepoint.com');

export const ATenantUrl = 'https://login.microsoftonline.com/unittest.onmicrosoft.com/oauth2/authorize?response_type=id_token&' +
    'client_id=61bdbb45-4004-48e3-4444-e4f1740661c8&redirect_uri=http%3A%2F%2Flocalhost&state=xxx&client-request-id=xxx&x-client-SKU=Js&x-client-Ver=1.0.0&nonce=xxx';
export const ATenantUrl_AccessToken = 'https://login.microsoftonline.com/friden.onmicrosoft.com/oauth2/authorize?response_type=token&' +
    'client_id=0113255e-cecc-4ad1-b101-08822ea5d0da&redirect_uri=http%3A%2F%2Flocalhost%3A4200&state=xxx&' +
    'resource=https://friden.sharepoint.com&client-request-id=xxx&x-client-SKU=Js&x-client-Ver=1.0.0&nonce=xxx';
