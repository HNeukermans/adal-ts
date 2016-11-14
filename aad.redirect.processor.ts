import { QueryStringDeserializer, hasAadProps } from './query.string.deserializer';
import { Constants } from './Constants';
import { AadRedirectUrl } from './aad.redirect.url';
import { UserDecoder } from './user.decoder';
import { Storage } from './Storage';
export class AadRedirectProcessor {

    constructor(private queryStringDeserializer: QueryStringDeserializer, private userDecoder: UserDecoder, private storage: Storage, private window: Window) {
    }

    public process(): boolean {

        let deserializedHash = this.queryStringDeserializer.deserialize(this.window.location.hash);
        let aadRedirect = new AadRedirectUrl(deserializedHash);
        if (aadRedirect.isAadRedirect()) {
            let userProfile = this.userDecoder.decode(aadRedirect.idToken);
            this.storage.setItem(Constants.STORAGE.IDTOKEN, aadRedirect.idToken);
            this.window.location.assign(this.storage.getItem(Constants.STORAGE.LOGIN_REQUEST));
        }

        return aadRedirect.isAadRedirect();
    }
}