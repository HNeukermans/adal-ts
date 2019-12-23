/// <reference path="./../node_modules/@types/jasmine/index.d.ts" />

import * as _ from 'lodash';

import { ATenantConfig, ATenantUrl } from './scenario/a.production.adal.config';

import { AuthenticationContext } from './authentication.context';
import { Constants } from './constants';
import { QueryStringDeserializer } from './query.string.deserializer';

let sut: QueryStringDeserializer;
describe('QueryStringDeserializer', () => {
  'use strict';

  beforeEach(() => {
    sut = new QueryStringDeserializer();
  });

  it('deserialize url should return instance', () => {
    var hash = '#id_token=xxx&state=S1&session_state=SS2';

    let instance = sut.deserialize(hash);

    expect(instance['state']).toBe('S1');
    expect(instance['id_token']).toBe('xxx');
    expect(instance['session_state']).toBe('SS2');
  });
});
