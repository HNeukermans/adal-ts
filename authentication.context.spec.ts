/// <reference path="./node_modules/@types/jasmine/index.d.ts" />
import { AuthenticationContext } from "./authentication.context";
import { LocalStorage } from './LocalStorage';
import { Navigator } from './Navigator';
import { AadUrlBuilder } from "./AadUrlBuilder";
import { GuidGenerator } from "./guid.generator";
import { Constants } from "./Constants";
import { ATenantConfig, ATenantUrl } from "./scenario/AAdalConfig";
import * as _ from "lodash";

describe('AuthenticationContext', () => {
    'use strict';

    beforeEach(() => {
        this.config = ATenantConfig;
        this.localStorage = new LocalStorage();
        this.navigator = new Navigator();
        this.guidGenerator = new GuidGenerator();
        this.aadUrlBuilder = new AadUrlBuilder(this.guidGenerator);
    });

    beforeEach(() => {
        this.sut = new AuthenticationContext(this.config, this.localStorage, this.navigator, this.guidGenerator, this.aadUrlBuilder);
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
        const context = new AuthenticationContext(ATenantConfig, this.localStorage, this.navigator, this.guidGenerator, this.aadUrlBuilder);
        spyOn(this.navigator, 'navigate').and.returnValue('xxx');
        spyOn(this.guidGenerator, 'generate').and.returnValue('xxx');

        this.sut.login();

        expect(this.navigator.navigate).toHaveBeenCalled();
        //expect(this.navigator.navigate).toHaveBeenCalledWith(ATenantUrl); //should create a  specific matcher gfor this   
    });

    it('login should store its state', () => {
        const context = new AuthenticationContext(this.config, this.localStorage, this.navigator, this.guidGenerator, this.aadUrlBuilder);
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

});