import {inject} from 'aurelia-dependency-injection';
import {HttpClient} from 'aurelia-http-client';
import IdentityServiceSdkConfig from './identityServiceSdkConfig';

export default
@inject(HttpClient, IdentityServiceSdkConfig)
class GetUserInfoUseCase {

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

        return this._httpClient
            .createRequest('oauth2/userinfo')
            .asGet()
            .withBaseUrl(this._config.baseUrl)
            .withHeader('Authorization', `Bearer ${accessToken}`)
            .send()
            .then((response) => (response.content));

    }

}
