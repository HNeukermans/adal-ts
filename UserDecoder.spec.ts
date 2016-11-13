import { UserDecoder } from './UserDecoder';
import { Constants } from "./Constants";
import { AadProductionTokenSample, AadProductionUserProfileSample } from "./scenario/AAdalConfig";
import * as _ from "lodash";

describe('UserDecoder', () => {
    'use strict';

    beforeEach(() => {
        this.sut = new UserDecoder();
    });

    it('decode token string should return user instance', () => {

        let instance = this.sut.decode(AadProductionTokenSample);

        expect(instance.userName).toBe('guestone@hneu70532.onmicrosoft.com');
        expect(instance.profile).toEqual(jasmine.objectContaining(AadProductionUserProfileSample));
    });

});