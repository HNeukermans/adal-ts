import { AadRedirectUrl } from './aad.redirect.url';
import { Constants } from './constants';
import { QueryStringDeserializer } from './query.string.deserializer';
import { Storage } from './storage';
import { UserDecoder } from './user.decoder';

export class AadRedirectProcessor {
  constructor(
    private queryStringDeserializer: QueryStringDeserializer,
    private userDecoder: UserDecoder,
    private storage: Storage,
    private window: Window
  ) {}

  public process(): boolean {
    const deserializedHash = this.queryStringDeserializer.deserialize(this.window.location.hash);

    const aadHashRe = new AadRedirectUrl(deserializedHash);

    if (aadHashRe.isAadRedirect()) {
      const token = aadHashRe.idToken || aadHashRe.accesToken;
      this.userDecoder.decode(token);
      this.storage.setItem(Constants.STORAGE.IDTOKEN, token);
      if (aadHashRe.accesToken) this.storage.setItem(Constants.STORAGE.ACCESSTOKEN, aadHashRe.accesToken);

      const lg = this.storage.getItem(Constants.STORAGE.LOGIN_REQUEST);
      if (lg) this.window.location.assign(lg);
    }

    return aadHashRe.isAadRedirect();
  }
}
