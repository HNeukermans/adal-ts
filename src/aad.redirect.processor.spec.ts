import { QueryStringDeserializer } from './query.string.deserializer';
import { UserDecoder } from './user.decoder';
import { SessionStorage } from './local.storage';
import { Constants } from './constants';
import { AadProductionTokenSample, AadProductionRedirectHash, AadProductionUserProfileSample } from './scenario/a.production.aad.response';
import { AadRedirectProcessor } from './aad.redirect.processor';

describe('AadRedirectProcessor', () => {
    'use strict';

    beforeEach(() => {
        this.localStorage = new SessionStorage();
        this.window = <Window>{ location: { hash: '' } };
        this.window.location.assign = function () { };
        this.userDecoder = new UserDecoder();
        this.queryStringDeserializer = new QueryStringDeserializer();
    });

    beforeEach(() => {
        this.window.location.hash = AadProductionRedirectHash;
        this.sut = new AadRedirectProcessor(this.queryStringDeserializer, this.userDecoder, this.localStorage, this.window);
    });

    it('processor should process aadredirect', () => {

        spyOn(this.queryStringDeserializer, 'deserialize').and.callThrough();
        spyOn(this.userDecoder, 'decode').and.callThrough();
        spyOn(this.localStorage, 'setItem').and.callThrough();

        this.sut.process();

        expect(this.queryStringDeserializer.deserialize).toHaveBeenCalledWith(AadProductionRedirectHash);
        expect(this.userDecoder.decode).toHaveBeenCalledWith(AadProductionTokenSample);
        expect(this.localStorage.setItem).toHaveBeenCalledWith(Constants.STORAGE.IDTOKEN, AadProductionTokenSample);
    });
});