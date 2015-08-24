import {inject} from 'aurelia-dependency-injection';
import {HttpClient} from 'aurelia-http-client';
import IdentityServiceSdkConfig from './identityServiceSdkConfig';

@inject(HttpClient, IdentityServiceSdkConfig) class RefreshAccessTokenUseCase {

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

        const content = new FormData();
        content.append('grant_type', 'urn:ietf:params:oauth:grant-type:jwt-bearer');
        content.append('assertion', accessToken);

        return this._httpClient
            .createRequest('oauth2/token')
            .asPost()
            .withBaseUrl(this._config.baseUrl)
            .withHeader('Content-Type', 'application/x-www-form-urlencoded')
            .withParams({
                grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
                assertion: accessToken
            })
            .send()
            .then((response) => (response.content.access_token));
    }

}

export default RefreshAccessTokenUseCase;