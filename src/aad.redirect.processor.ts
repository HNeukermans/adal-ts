import { QueryStringDeserializer, hasAadProps } from './query.string.deserializer';
import { Constants } from './constants';
import { AadRedirectUrl } from './aad.redirect.url';
import { UserDecoder } from './user.decoder';
import { Storage } from './storage';
export class AadRedirectProcessor {

    constructor(private queryStringDeserializer: QueryStringDeserializer, private userDecoder: UserDecoder, private storage: Storage, private window: Window) {
    }

    public process(): string {

        let deserializedHash = this.queryStringDeserializer.deserialize(this.window.location.hash);
        let aadRedirect = new AadRedirectUrl(deserializedHash);
        if (aadRedirect.isAadRedirect()) {
            if (aadRedirect.state === this.storage.getItem(Constants.STORAGE.STATE_LOGIN)) {
                let userProfile = this.userDecoder.decode(aadRedirect.idToken);
                if (userProfile.nonce === this.storage.getItem(Constants.STORAGE.NONCE_IDTOKEN)) {
                    this.storage.setItem(Constants.STORAGE.IDTOKEN, aadRedirect.idToken || '');
                    this.storage.setItem(Constants.STORAGE.ACCESSTOKEN, aadRedirect.accessToken || '');
                    // TODO take expiresin and create timestamp for expiration.
                    this.storage.setItem(Constants.STORAGE.EXPIRATION_KEY, aadRedirect.expiresIn);
                    this.storage.setItem(Constants.STORAGE.SCOPE, aadRedirect.scope);
                    this.window.location.assign(this.storage.getItem(Constants.STORAGE.LOGIN_REQUEST));
                    return(this.storage.getItem(Constants.STORAGE.POST_LOGIN));
                }
            }
        }
        return;
    }
}