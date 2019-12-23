/* eslint-disable @typescript-eslint/no-explicit-any */

import { User } from './user';

declare function escape(v: string): string;

export class UserDecoder {
  public decode(encoded: string): User {
    const jwtDecoded = this.decodeJwt(encoded);
    if (!jwtDecoded) {
      throw Error('Failed to decode value. Value has invalid format.');
    }

    const decodedPayLoad = this.safeDecodeBase64(jwtDecoded.JWSPayload);

    const user = JSON.parse(decodedPayLoad);

    // if (!user || !user.hasOwnProperty('aud')) throw new Error('');

    return user as User;
  }

  private safeDecodeBase64(value: string) {
    const base64Decoded = this.base64DecodeStringUrlSafe(value);
    if (!base64Decoded) {
      // this.info('The returned id_token could not be base64 url safe decoded.');
      throw Error('Failed to base64 decode value. Value has invalid format.');
    }

    return base64Decoded;
  }

  private decodeJwt = function(jwtToken: string) {
    const idTokenPartsRegex = /^([^\.\s]*)\.([^\.\s]+)\.([^\.\s]*)$/;

    const matches = idTokenPartsRegex.exec(jwtToken);
    if (!matches || matches.length < 4) {
      throw new Error(
        `Failed to decode Jwt token. The token has invalid format. Actual token: '${jwtToken}'`
      );
    }

    const crackedToken = {
      header: matches[1],
      JWSPayload: matches[2],
      JWSSig: matches[3]
    };

    return crackedToken;
  };

  private base64DecodeStringUrlSafe = (base64IdToken: string) => {
    // html5 should support atob function for decoding
    base64IdToken = base64IdToken.replace(/-/g, '+').replace(/_/g, '/');
    if (window.atob) {
      return decodeURIComponent(escape(window.atob(base64IdToken))); // jshint ignore:line
    } else {
      return decodeURIComponent(escape(this.decodeBase64(base64IdToken)));
    }
  };

  private decodeBase64(base64IdToken: string) {
    const codes = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
    base64IdToken = String(base64IdToken).replace(/=+$/, '');

    const length = base64IdToken.length;
    if (length % 4 === 1) {
      throw new Error('The token to be decoded is not correctly encoded.');
    }

    let h1: any,
      h2: any,
      h3: any,
      h4: any,
      bits: any,
      c1: any,
      c2: any,
      c3: any,
      decoded = '';
    for (let i = 0; i < length; i += 4) {
      // every 4 base64 encoded character will be converted to 3 byte string, which is 24 bits
      // then 6 bits per base64 encoded character
      h1 = codes.indexOf(base64IdToken.charAt(i));
      h2 = codes.indexOf(base64IdToken.charAt(i + 1));
      h3 = codes.indexOf(base64IdToken.charAt(i + 2));
      h4 = codes.indexOf(base64IdToken.charAt(i + 3));

      // for padding, if last two are '='
      if (i + 2 === length - 1) {
        bits = (h1 << 18) | (h2 << 12) | (h3 << 6);
        c1 = (bits >> 16) & 255;
        c2 = (bits >> 8) & 255;
        decoded += String.fromCharCode(c1, c2);
        break;
      }
      // if last one is '='
      else if (i + 1 === length - 1) {
        bits = (h1 << 18) | (h2 << 12);
        c1 = (bits >> 16) & 255;
        decoded += String.fromCharCode(c1);
        break;
      }

      bits = (h1 << 18) | (h2 << 12) | (h3 << 6) | h4;

      // then convert to 3 byte chars
      c1 = (bits >> 16) & 255;
      c2 = (bits >> 8) & 255;
      c3 = bits & 255;

      decoded += String.fromCharCode(c1, c2, c3);
    }

    return decoded;
  }

  private isEmpty(str: string) {
    return typeof str === 'undefined' || !str || 0 === str.length;
  }
}
