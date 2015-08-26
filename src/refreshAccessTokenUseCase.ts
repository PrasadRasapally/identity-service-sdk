import {autoinject} from 'aurelia-dependency-injection';
import {HttpClient} from 'aurelia-http-client';
import IdentityServiceSdkConfig from './identityServiceSdkConfig';

/**
 * @class RefreshAccessTokenUseCase
 * @constructor
 */
@autoinject
class RefreshAccessTokenUseCase {

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
     * Refreshes the provided access token. Primarily used to refresh an access token for the
     * purposes of maintaining an active session without redirecting the client browser to re-authenticate.
     * @param {String} accessToken
     * @returns a promise of {String}
     */
    execute(accessToken) {

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