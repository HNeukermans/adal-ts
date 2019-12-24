import * as _ from 'lodash';

import { AadLogoutUrlBuilder } from './aad.logout.url.builder';
import { AadUrlConfig } from './aad.url.config';

let tenant: string;
let postLogoutRedirectUrl: string;

describe('AadLogoutUrlBuilder', () => {
  'use strict';

  beforeEach(() => {
    tenant = 'hneu70532.onmicrosoft.com';
    postLogoutRedirectUrl = 'http://www.hneu.com';
  });

  it('build should create aad url', () => {
    // arrange
    let expectedLocation = 'https://login.microsoftonline.com/' + tenant + '/oauth2/logout';
    let expectedRedirectUrl = '?post_logout_redirect_uri=' + encodeURIComponent('http://www.hneu.com');

    // act
    let actualUrl = new AadLogoutUrlBuilder().with(tenant, postLogoutRedirectUrl).build();

    // assert
    expect(_.startsWith(actualUrl, expectedLocation)).toBe(true, 'incorrect location');
    actualUrl = actualUrl.replace(expectedLocation, '');

    expect(_.startsWith(actualUrl, expectedRedirectUrl)).toBe(true, 'incorrect redirect url');
    actualUrl = actualUrl.replace(expectedRedirectUrl, '');
  });
});
