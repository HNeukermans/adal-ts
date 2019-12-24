import { AadLogoutUrlBuilder } from './aad.logout.url.builder';
import { AadRedirectProcessor } from './aad.redirect.processor';
import { AadUrlBuilder } from './aad.url.builder';
import { AdalConfig } from './adal.config';
import { AuthenticationContext } from './authentication.context';
import { GuidGenerator } from './guid.generator';
import { LocalStorage } from './local.storage';
import { Navigator } from './navigator';
import { QueryStringDeserializer } from './query.string.deserializer';
import { SessionStorage } from './session.storage';
import { UserDecoder } from './user.decoder';

export type StorageType = 'sessionStorage' | 'localStorage';

export class Authentication {
  public static getContext(
    configuration: AdalConfig,
    storage: StorageType = 'localStorage'
  ): AuthenticationContext {
    const context = new AuthenticationContext(
      configuration,
      storage === 'localStorage' ? new LocalStorage() : new SessionStorage(),
      new Navigator(),
      new GuidGenerator(),
      new AadUrlBuilder(new GuidGenerator()),
      new UserDecoder(),
      new AadLogoutUrlBuilder()
    );
    // TODO this.enableNativeLogging();
    return context;
  }

  public static getAadRedirectProcessor(storage: StorageType) {
    const p = new AadRedirectProcessor(
      new QueryStringDeserializer(),
      new UserDecoder(),
      storage === 'localStorage' ? new LocalStorage() : new SessionStorage(),
      window
    );
    return p;
  }
}
