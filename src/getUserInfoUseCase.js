import {HttpClient} from 'aurelia-fetch-client';
import IdentityServiceSdkConfig from './identityServiceSdkConfig';

export default class GetUserInfoUseCase {

    //noinspection ES6Validation
    @inject(HttpClient, IdentityServiceSdkConfig)
    constructor(httpClient,
                config) {

        this._httpClient = httpClient;
        this._config = config;

    }

    /**
     * Gets userInfo via the provided access token.
     * @param {String} accessToken
     * @returns a promise of {OidcUserInfo}
     */
    execute(accessToken) {

        // construct request
        const request = new Request();
        request.method = 'GET';
        request.headers.set('Authorization', `Bearer ${accessToken}`);
        request.url = `${this._config.baseUrl}/oauth2/userinfo`;

        return this
            ._httpClient
            .fetch(request)
            .then((response) => (response.data));

    }

}
