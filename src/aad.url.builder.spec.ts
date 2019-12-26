import * as _ from 'lodash';

import { AadUrlBuilder } from './aad.url.builder';
import { AadUrlConfig } from './aad.url.config';
import { GuidGenerator } from './guid.generator';

let options: AadUrlConfig;

describe('AadUrlBuilder', () => {
  'use strict';

  beforeEach(() => {
    options = createConfig();
  });

  it('build should create aad url', () => {
    // arrange
    let expectedLocation =
      'https://login.microsoftonline.com/' + options.tenant + '/' + AadUrlBuilder.V2_END_POINT;
    let expectedResponseType = '?response_type=' + options.responseType;
    let expectedClientId = '&client_id=' + options.clientId;
    let expectedRedirectUrl =
      '&redirect_uri=' + encodeURIComponent('http://ng2a-hneu-web-ui.azurewebsites.net/');
    let expectedStateUrl = '&state=' + options.state;
    let expectedClientRequestId = '&client-request-id=' + options.clientRequestId;
    let expectedLibVersion = '&x-client-SKU=Js&x-client-Ver=' + options.libVersion;
    let expectedNonce = '&nonce=' + options.nonce;

    // act
    let actualUrl = new AadUrlBuilder(new GuidGenerator()).with(options).build();

    // assert
    expect(_.includes(actualUrl, AadUrlBuilder.V2_END_POINT)).toBe(true, 'incorrect END_POINT');
    expect(_.startsWith(actualUrl, expectedLocation)).toBe(true, 'incorrect location');
    actualUrl = actualUrl.replace(expectedLocation, '');

    expect(_.startsWith(actualUrl, expectedResponseType)).toBe(true, 'incorrect response type');
    actualUrl = actualUrl.replace(expectedResponseType, '');

    expect(_.startsWith(actualUrl, expectedClientId)).toBe(true, 'incorrect client id');
    actualUrl = actualUrl.replace(expectedClientId, '');

    expect(_.startsWith(actualUrl, expectedRedirectUrl)).toBe(true, 'incorrect redirecturl');
    actualUrl = actualUrl.replace(expectedRedirectUrl, '');

    expect(_.startsWith(actualUrl, expectedStateUrl)).toBe(true, 'incorrect state');
    actualUrl = actualUrl.replace(expectedStateUrl, '');

    expect(_.startsWith(actualUrl, expectedClientRequestId)).toBe(true, 'incorrect expectedClientRequestId');
    actualUrl = actualUrl.replace(expectedClientRequestId, '');

    expect(_.includes(actualUrl, expectedLibVersion)).toBe(true, 'incorrect lib version');
    actualUrl = actualUrl.replace(expectedLibVersion, '');

    expect(_.includes(actualUrl, expectedNonce)).toBe(true, 'incorrect nonce');
    actualUrl = actualUrl.replace(expectedNonce, '');
  });

  function createConfig(): AadUrlConfig {
    return {
      nonce: new GuidGenerator().generate(),
      tenant: 'hneu70532.onmicrosoft.com',
      responseType: 'id_token',
      clientId: new GuidGenerator().generate(),
      redirectUri: 'http://ng2a-hneu-web-ui.azurewebsites.net/',
      state: new GuidGenerator().generate(),
      clientRequestId: new GuidGenerator().generate(),
      libVersion: '1.0.0'
    };
  }
});
