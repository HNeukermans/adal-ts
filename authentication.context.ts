import { GuidGenerator } from './guid.generator';
import { Storage } from './storage';
import { Constants, RequestTypes } from './Constants';
import { Navigator } from './Navigator';
import { AadUrlBuilder } from './AadUrlBuilder';
import { UserDecoder } from './user.decoder';
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
    private userDecoder: UserDecoder;
    private CONSTANTS = Constants;
    private REQUEST_TYPES = RequestTypes;

    constructor(config: AdalConfig, storage: Storage, navigator: Navigator, guidGenerator: GuidGenerator, aadUrlBuilder: AadUrlBuilder, userDecoder: UserDecoder) {
        this.storage = storage;
        this.navigator = navigator;
        this.config = config;
        this.guidGenerator = guidGenerator;
        this.aadUrlBuilder = aadUrlBuilder;
        this.userDecoder = userDecoder;
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

    public getUser(): any {
        let idtoken = this.storage.getItem(Constants.STORAGE.IDTOKEN);
        let user = this.userDecoder.decode(idtoken);
        return user;
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
