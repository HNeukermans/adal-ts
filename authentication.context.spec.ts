/// <reference path="./node_modules/@types/jasmine/index.d.ts" />
import { AuthenticationContext } from "./authentication.context";
import { LocalStorage } from './local.storage';
import { Navigator } from './Navigator';
import { AadUrlBuilder } from "./AadUrlBuilder";
import { GuidGenerator } from "./guid.generator";
import { UserDecoder } from './user.decoder';
import { Constants } from "./Constants";
import { ATenantConfig, ATenantUrl } from "./scenario/a.production.adal.config";
import { AadProductionTokenSample, AadProductionUserProfileSample } from "./scenario/a.production.aad.response";
import * as _ from "lodash";

describe('AuthenticationContext', () => {
    'use strict';

    beforeEach(() => {
        this.config = ATenantConfig;
        this.localStorage = new LocalStorage();
        this.navigator = new Navigator();
        this.guidGenerator = new GuidGenerator();
        this.aadUrlBuilder = new AadUrlBuilder(this.guidGenerator);
        this.userDecoder = new UserDecoder();
    });

    beforeEach(() => {
        this.sut = new AuthenticationContext(this.config, this.localStorage, this.navigator, this.guidGenerator, this.aadUrlBuilder, this.userDecoder);
    });

    it('login should build the url', () => {

        spyOn(this.navigator, 'navigate');
        spyOn(this.aadUrlBuilder, 'with').and.callThrough();
        spyOn(this.aadUrlBuilder, 'build').and.callThrough();

        this.sut.login();

        expect(this.aadUrlBuilder.with).toHaveBeenCalledWith(jasmine.objectContaining(this.config));
        expect(this.aadUrlBuilder.build).toHaveBeenCalled();
    });

    it('login should navigate to aad url', () => {
        spyOn(this.navigator, 'navigate').and.returnValue('xxx');
        spyOn(this.guidGenerator, 'generate').and.returnValue('xxx');

        this.sut.login();

        expect(this.navigator.navigate).toHaveBeenCalled();
        //expect(this.navigator.navigate).toHaveBeenCalledWith(ATenantUrl); //should create a  specific matcher gfor this   
    });

    it('login should store its state', () => {
        spyOn(this.localStorage, 'setItem');
        spyOn(this.guidGenerator, 'generate').and.returnValue('xxx');
        spyOn(this.navigator, 'navigate');
        this.sut.login();

        expect(this.localStorage.setItem.calls.argsFor(0)).toEqual(jasmine.arrayContaining([Constants.STORAGE.LOGIN_REQUEST]));
        expect(this.localStorage.setItem.calls.argsFor(1)).toEqual([Constants.STORAGE.STATE_LOGIN, 'xxx']);
        expect(this.localStorage.setItem.calls.argsFor(2)).toEqual([Constants.STORAGE.NONCE_IDTOKEN, 'xxx']);
        expect(this.localStorage.setItem.calls.argsFor(3)).toEqual([Constants.STORAGE.LOGIN_ERROR, '']);
        expect(this.localStorage.setItem.calls.argsFor(4)).toEqual([Constants.STORAGE.ERROR, '']);
        expect(this.localStorage.setItem.calls.argsFor(5)).toEqual([Constants.STORAGE.ERROR_DESCRIPTION, '']);
    });

    it('getUser should return stored decoded idtoken ', () => {

        spyOn(this.localStorage, 'setItem').and.callFake(function () {
            return AadProductionTokenSample;
        });
        spyOn(this.userDecoder, 'decode').and.callThrough();

        let user = this.sut.getUser();

        expect(this.userDecoder.decode).toHaveBeenCalledWith(AadProductionTokenSample);
        expect(user).toEqual(AadProductionUserProfileSample);

    });

});