import {HttpClient} from 'aurelia-fetch-client';
import IdentityServiceSdkConfig from './identityServiceSdkConfig';

export default class RefreshAccessTokenUseCase {

    //noinspection ES6Validation
    @inject(HttpClient, IdentityServiceSdkConfig)
    constructor(httpClient,
                config) {

        this._httpClient = httpClient;
        this._config = config;

    }

    /**
     * Refreshes the provided access token. Primarily used to refresh an access token for the
     * purposes of maintaining an active session without redirecting the client browser to re-authenticate.
     * @param {String} accessToken
     * @returns a promise of {String}
     */
    execute(accessToken) {

        const requestBody = new FormData();
        requestBody.append('grant_type', 'urn:ietf:params:oauth:grant-type:jwt-bearer');
        requestBody.append('assertion', accessToken);

        const request = new Request();
        request.method = 'POST';
        request.url = `${this._config.baseUrl}/oauth2/token`;
        request.body = requestBody;

        return this
            ._httpClient
            .fetch(request)
            .then((response) => (response.data.access_token));
    }

}