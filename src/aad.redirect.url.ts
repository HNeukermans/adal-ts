import { Constants } from './constants';

export class AadRedirectUrl {

    constructor(private object: any) {
    }

    get idToken(): string {
        return this.object[Constants.ID_TOKEN];
    }
    get expiresIn() {
        return this.object[Constants.EXPIRES_IN];
    }

    get accessToken() {
        return this.object[Constants.ACCESS_TOKEN];
    }

    get sessionState() {
        return this.object[Constants.SESSION_STATE];
    }

    get state() {
        return this.object[Constants.STATE];
    }

    get scope() {
        return this.object[Constants.SCOPE];
    }

    public isAadRedirect(): boolean {
        return (
            this.object.hasOwnProperty(Constants.ERROR_DESCRIPTION) ||
            this.object.hasOwnProperty(Constants.ACCESS_TOKEN) ||
            this.object.hasOwnProperty(Constants.ID_TOKEN)
        );
    }

} 