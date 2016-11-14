/// <reference path="./node_modules/@types/jasmine/index.d.ts" />
import { Injectable } from '@angular/core';
import { AuthenticationContext } from './authentication.context';
import { Authentication } from './authentication';
import { LocalStorage } from './local.storage';
import { AdalConfig } from './AdalConfig';
import { Navigator } from './Navigator';
import { AadUrlBuilder } from "./AadUrlBuilder";
import { GuidGenerator } from "./guid.generator";
import { Constants } from "./Constants";
import { ATenantConfig } from "./scenario/AAdalConfig";
//import { AdalAuthenticationContext } from './adal.authentication.context';
//declare let Logging: adal.Logging;

describe('AdalAuthentication', () => {
    'use strict';

    // beforeEach(() => {
    //     this.config = AAdalConfig;
    // });

    // beforeEach(() => {
    //     this.sut = Authentication.getContext(this.config);
    // });

    // it('build should create aad url', () => {

    //     //arrange
    //     let expectedLocation = 'https://login.microsoftonline.com/' + this.options.tenant + '/oauth2/authorize';
    // });

});


