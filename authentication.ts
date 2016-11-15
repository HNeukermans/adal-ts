import { Injectable } from '@angular/core';
import { AuthenticationContext } from './authentication.context';
import { LocalStorage } from './local.storage';
import { Navigator } from './Navigator';
import { AadUrlBuilder } from "./aad.url.builder";
import { GuidGenerator } from "./guid.generator";
import { Constants } from "./Constants";
import { UserDecoder } from './user.decoder';
import { AdalConfig } from "./adal.config";
import { AadRedirectProcessor } from './aad.redirect.processor';
import { QueryStringDeserializer, hasAadProps } from './query.string.deserializer';

@Injectable()
export class Authentication {

    constructor() {
    }

    public static getContext(configuration: AdalConfig): AuthenticationContext {

        console.log('getContext...');

        let context = new AuthenticationContext(
            configuration,
            new LocalStorage(),
            new Navigator(),
            new GuidGenerator(),
            new AadUrlBuilder(new GuidGenerator()),
            new UserDecoder());
        //TODO this.enableNativeLogging();
        return context;
    }

    public static getAadRedirectProcessor() {

        let p = new AadRedirectProcessor(
            new QueryStringDeserializer(),
            new UserDecoder(),
            new LocalStorage(),
            window);
        return p;
    }
}


