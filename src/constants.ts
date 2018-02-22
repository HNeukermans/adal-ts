export const Constants = {
    ACCESS_TOKEN: 'access_token',
    EXPIRES_IN: 'expires_in',
    ID_TOKEN: 'id_token',
    ERROR_DESCRIPTION: 'error_description',
    SESSION_STATE: 'session_state',
    STORAGE: {
        TOKEN_KEYS: 'adal.token.keys',
        ACCESS_TOKEN_KEY: 'adal.access.token.key',
        EXPIRATION_KEY: 'adal.expiration.key',
        STATE_LOGIN: 'adal.state.login',
        STATE_RENEW: 'adal.state.renew',
        NONCE_IDTOKEN: 'adal.nonce.idtoken',
        SESSION_STATE: 'adal.session.state',
        USERNAME: 'adal.username',
        IDTOKEN: 'adal.idtoken',
        ACCESSTOKEN: 'adal.accesstoken',
        ERROR: 'adal.error',
        ERROR_DESCRIPTION: 'adal.error.description',
        LOGIN_REQUEST: 'adal.login.request',
        LOGIN_ERROR: 'adal.login.error',
        RENEW_STATUS: 'adal.token.renew.status'
    },
    RESOURCE_DELIMETER: '|',
    LOADFRAME_TIMEOUT: '6000',
    TOKEN_RENEW_STATUS_CANCELED: 'Canceled',
    TOKEN_RENEW_STATUS_COMPLETED: 'Completed',
    TOKEN_RENEW_STATUS_IN_PROGRESS: 'In Progress',
    LOGGING_LEVEL: {
        ERROR: 0,
        WARN: 1,
        INFO: 2,
        VERBOSE: 3
    },
    LEVEL_STRING_MAP: {
        0: 'ERROR:',
        1: 'WARNING:',
        2: 'INFO:',
        3: 'VERBOSE:'
    },
    ENDPOINT_TO_URL_PART_MAP: {
        'V1': '',
        'V2': 'v2.0/',
    }
};

export const RequestTypes = {
    LOGIN: 'LOGIN',
    RENEW_TOKEN: 'RENEW_TOKEN',
    UNKNOWN: 'UNKNOWN'
};

export enum EndpointVersion {
    V1 = 'V1',
    V2 = 'V2',
}
