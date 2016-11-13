import { GuidGenerator } from './guid.generator';
import { Storage } from './IStorage';
import { Constants, RequestTypes } from './Constants';
import { Navigator } from './Navigator';
import { AadUrlBuilder } from './AadUrlBuilder';
import { AdalConfig } from './AdalConfig';

export class AuthenticationContext {

    private idTokenNonce: string;
    private instance: string;
    private loginInProgress: boolean;
    private config: AdalConfig;
    private storage: Storage;
    private navigator: Navigator;
    private guidGenerator: GuidGenerator;
    private aadUrlBuilder: AadUrlBuilder;
    private CONSTANTS = Constants;
    private REQUEST_TYPES = RequestTypes;

    constructor(config: AdalConfig, storage: Storage, navigator: Navigator, guidGenerator: GuidGenerator, aadUrlBuilder: AadUrlBuilder) {
        this.storage = storage;
        this.navigator = navigator;
        this.config = config;
        this.guidGenerator = guidGenerator;
        this.aadUrlBuilder = aadUrlBuilder;
    }

    public login(): void {
        if (this.loginInProgress) {
            this.info("Login in progress");
            return;
        }

        let urlConfig: any = this.cloneConfig(this.config);
        urlConfig.nonce = this.guidGenerator.generate();
        urlConfig.state = this.guidGenerator.generate();

        this.verbose('Expected state: ' + urlConfig.state + ' startPage:' + window.location);
        this.storage.setItem(this.CONSTANTS.STORAGE.LOGIN_REQUEST, (<any>window).location);
        this.storage.setItem(this.CONSTANTS.STORAGE.STATE_LOGIN, urlConfig.state);
        this.storage.setItem(this.CONSTANTS.STORAGE.NONCE_IDTOKEN, urlConfig.nonce);
        this.storage.setItem(this.CONSTANTS.STORAGE.LOGIN_ERROR, '');
        this.storage.setItem(this.CONSTANTS.STORAGE.ERROR, '');
        this.storage.setItem(this.CONSTANTS.STORAGE.ERROR_DESCRIPTION, '');
        debugger;
        let url = this.aadUrlBuilder.with(urlConfig).build();

        this.navigator.navigate(url);

        this.loginInProgress = true;
    }

    private createOptions(): any {
        return {
            nonce: this.idTokenNonce,
            tenant: this.config.tenant,
            clientId: this.config.clientId
        }
    }

    public getCachedUser(): any {
        // if (this.user) {
        //     return this.user;
        // }

        // let idtoken = this.storage.getItem(this.CONSTANTS.STORAGE.IDTOKEN);
        // this.user = this.createUser(idtoken);
        // return this._user;
    }

    private verbose(message: string): void {

    }


    private info(message: string): void {

    }

    private cloneConfig(obj: any) {
        if (null === obj || 'object' !== typeof obj) {
            return obj;
        }

        var copy: any = {};
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) {
                copy[attr] = obj[attr];
            }
        }
        return copy;
    };

}
