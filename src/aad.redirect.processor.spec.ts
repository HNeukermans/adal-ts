import { QueryStringDeserializer } from './query.string.deserializer';
import { UserDecoder } from './user.decoder';
import { LocalStorage } from './local.storage';
import { Constants } from './constants';
import {
  AadProductionTokenSample,
  AadProductionRedirectHash,
  AadProductionUserProfileSample
} from './scenario/a.production.aad.response';
import { AadRedirectProcessor } from './aad.redirect.processor';

let localStorage: LocalStorage;
let window: Window;
let userDecoder: UserDecoder;
let queryStringDeserializer: QueryStringDeserializer;
let sut: AadRedirectProcessor;

describe('AadRedirectProcessor', () => {
  'use strict';

  beforeEach(() => {
    localStorage = new LocalStorage();
    window = <Window>{ location: { hash: '' } };
    window.location.assign = function() {};
    userDecoder = new UserDecoder();
    queryStringDeserializer = new QueryStringDeserializer();
  });

  beforeEach(() => {
    window.location.hash = AadProductionRedirectHash;
    sut = new AadRedirectProcessor(queryStringDeserializer, userDecoder, localStorage, window);
  });

  it('processor should process aadredirect', () => {
    spyOn(queryStringDeserializer, 'deserialize').and.callThrough();
    spyOn(userDecoder, 'decode').and.callThrough();
    spyOn(localStorage, 'setItem').and.callThrough();

    sut.process();

    expect(queryStringDeserializer.deserialize).toHaveBeenCalledWith(AadProductionRedirectHash);
    expect(userDecoder.decode).toHaveBeenCalledWith(AadProductionTokenSample);
    expect(localStorage.setItem).toHaveBeenCalledWith(Constants.STORAGE.IDTOKEN, AadProductionTokenSample);
  });
});
