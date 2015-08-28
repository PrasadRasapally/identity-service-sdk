import {inject} from 'aurelia-dependency-injection';
import {HttpClient} from 'aurelia-http-client';
import IdentityServiceSdkConfig from './identityServiceSdkConfig';
import OidcUserInfo from './oidcUserInfo';

/**
 * @class GetUserInfoUseCase
 * @constructor
 */
@inject(HttpClient, IdentityServiceSdkConfig) class GetUserInfoUseCase {

    _httpClient:HttpClient;
    _config:IdentityServiceSdkConfig;

    constructor(httpClient:HttpClient,
                config:IdentityServiceSdkConfig) {

        if (!httpClient) {
            throw 'httpClient required';
        }
        this._httpClient = httpClient;

        if (!config) {
            throw 'config required';
        }
        this._config = config;

    }

    /**
     * Gets userInfo via the provided access token.
     * @param {string} accessToken
     * @returns {Promise<OidcUserInfo>}
     */
    execute(accessToken:string):Promise<OidcUserInfo> {

        if (!accessToken) {
            return Promise.reject({statusCode: 401});
        }

        return this._httpClient
            .createRequest('oauth2/userinfo')
            .asGet()
            .withBaseUrl(this._config.baseUrl)
            .withHeader('Authorization', `Bearer ${accessToken}`)
            .send()
            .then((response) => (response.content));

    }

}

export default GetUserInfoUseCase;
