/* eslint-disable @typescript-eslint/no-explicit-any */

import { Constants } from './constants';

export class QueryStringDeserializer {
  private plRegex = /\+/g;

  public deserialize(queryString: string): any {
    queryString = this.trimHashSign(queryString);

    let match: RegExpExecArray | null;
    // Regex for replacing addition symbol with a space
    const searchRegex = /([^&=]+)=([^&]*)/g;

    const obj: any = {};
    match = searchRegex.exec(queryString);
    while (match) {
      obj[this.decode(match[1])] = this.decode(match[2]);
      match = searchRegex.exec(queryString);
    }

    return obj;
  }

  private decode(s: string): string {
    return decodeURIComponent(s.replace(this.plRegex, ' '));
  }

  private trimHashSign(hash: string) {
    if (hash.indexOf('#/') > -1) {
      hash = hash.substring(hash.indexOf('#/') + 2);
    } else if (hash.indexOf('#') > -1) {
      hash = hash.substring(1);
    }

    return hash;
  }
}

export function hasAadProps(deserializedHash: any): boolean {
  return (
    deserializedHash.hasOwnProperty(Constants.ERROR_DESCRIPTION) ||
    deserializedHash.hasOwnProperty(Constants.ACCESS_TOKEN) ||
    deserializedHash.hasOwnProperty(Constants.ID_TOKEN)
  );
}
