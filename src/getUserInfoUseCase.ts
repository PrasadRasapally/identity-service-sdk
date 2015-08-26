import {autoinject} from 'aurelia-dependency-injection';
import {HttpClient} from 'aurelia-http-client';
import IdentityServiceSdkConfig from './identityServiceSdkConfig';

/**
 * @class GetUserInfoUseCase
 * @constructor
 */
@autoinject
class GetUserInfoUseCase {

    private _httpClient:HttpClient;
    private _config:IdentityServiceSdkConfig;

    constructor(httpClient:HttpClient,
                config:IdentityServiceSdkConfig) {

        if(!httpClient){
            throw 'httpClient required';
        }
        this._httpClient = httpClient;

        if(!config){
            throw 'config required';
        }
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

export default GetUserInfoUseCase;
