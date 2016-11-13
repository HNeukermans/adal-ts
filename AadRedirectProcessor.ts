import { QueryStringDeserializer, hasAadProps } from './QueryStringDeserializer';
import { Constants } from './Constants';
import { AadRedirectUrl } from './AadRedirectUrl';
import { UserDecoder } from './UserDecoder';
import { Storage } from './Storage';
export class AadRedirectProcessor {

    constructor(private queryStringDeserializer: QueryStringDeserializer, private userDecoder: UserDecoder, private storage: Storage) {

    }

    public process(): void {

        let deserializedHash = this.queryStringDeserializer.deserialize(window.location.hash);
        let aadRedirect = new AadRedirectUrl(deserializedHash);
        if (aadRedirect.isAadRedirect()) {

            let userProfile = this.userDecoder.decode(aadRedirect.idToken);

            this.storage.setItem(Constants.STORAGE.IDTOKEN, aadRedirect.idToken);
            this.storage.setItem(Constants.STORAGE.IDTOKEN, aadRedirect.idToken);
            // var requestInfo = this.getRequestInfo(hash);
            // this.info('Returned from redirect url');
            // this.saveTokenFromHash(requestInfo);
            // window.location = this._getItem(this.CONSTANTS.STORAGE.LOGIN_REQUEST);
        }
    }
}