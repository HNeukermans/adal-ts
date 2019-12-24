import {
  AadProductionTokenSample,
  AadProductionUserProfileSample
} from './scenario/a.production.aad.response';

import { Constants } from './constants';
import { UserDecoder } from './user.decoder';

let sut: UserDecoder;

describe('UserDecoder', () => {
  'use strict';

  beforeEach(() => {
    sut = new UserDecoder();
  });

  it('decode token string should return user instance', () => {
    let instance = sut.decode(AadProductionTokenSample);

    expect(instance.upn).toBe('guestone@hneu70532.onmicrosoft.com');
    expect(instance).toEqual(jasmine.objectContaining(AadProductionUserProfileSample));
  });

  it('decode undefined should throw error', () => {
    let action = () => sut.decode(undefined);

    expect(action).toThrow();
  });
});
