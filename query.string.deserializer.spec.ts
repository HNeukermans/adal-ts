/// <reference path="./node_modules/@types/jasmine/index.d.ts" />
import { AuthenticationContext } from "./authentication.context";
import { QueryStringDeserializer } from './query.string.deserializer';
import { Constants } from "./Constants";
import { ATenantConfig, ATenantUrl } from "./scenario/AAdalConfig";
import * as _ from "lodash";

describe('QueryStringDeserializer', () => {
    'use strict';

    beforeEach(() => {
        this.sut = new QueryStringDeserializer();
    });

    it('deserialize url should return instance', () => {

        var hash = '#id_token=xxx&state=S1&session_state=SS2'

        let instance = this.sut.deserialize(hash);

        expect(instance['state']).toBe('S1');
        expect(instance['id_token']).toBe('xxx');
        expect(instance['session_state']).toBe('SS2');
    });

});