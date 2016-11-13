import { Injectable } from '@angular/core';
import { AuthenticationContext } from './authentication.context';
import { LocalStorage } from './LocalStorage';
import { Navigator } from './Navigator';
import { AadUrlBuilder } from "./AadUrlBuilder";
import { GuidGenerator } from "./guid.generator";
import { Constants } from "./Constants";
import { AdalConfig } from "./AdalConfig";
import { AadRedirectProcessor } from './AadRedirectProcessor';
import { QueryStringDeserializer, hasAadProps } from './QueryStringDeserializer';
//import { AdalAuthenticationContext } from './adal.authentication.context';
//declare let Logging: adal.Logging;

@Injectable()
export class Authentication {

    constructor() {
    }

    public static getContext(configuration: AdalConfig): AuthenticationContext {

        console.log('getContext...');

        let context = new AuthenticationContext(configuration, new LocalStorage(), new Navigator(), new GuidGenerator(), new AadUrlBuilder(new GuidGenerator()));
        // this.enableNativeLogging();
        // var context = <AdalAuthenticationContext>this.extend(nativeContext);
        return context;
    }

    public static getAadRedirectProcessor() {

        let p = new AadRedirectProcessor(new QueryStringDeserializer());
        return p;
    }
}


