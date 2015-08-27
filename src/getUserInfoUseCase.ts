/// <reference path="../typings/es6-promise/es6-promise.d.ts" />
/// <reference path="../typings/aurelia-http-client.d.ts" />
import {autoinject} from 'aurelia-dependency-injection';
import {HttpClient} from 'aurelia-http-client';
import {RequestBuilder} from 'aurelia-http-client/request-builder';
import {IdentityServiceSdkConfig} from './identityServiceSdkConfig';
import OidcUserInfo from './oidcUserInfo';

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
     * @param {String} accessToken
     * @returns {Promise<OidcUserInfo>}
     */
    execute(accessToken:String):Promise<OidcUserInfo> {

        if (!accessToken) {
            throw 'accessToken required';
        }

        return (<RequestBuilder>this._httpClient
            .createRequest('oauth2/userinfo'))
            .asGet()
            .withBaseUrl(this._config.baseUrl)
            .withHeader('Authorization', `Bearer ${accessToken}`)
            .send()
            .then((response) => (response.content));

    }

}

export default GetUserInfoUseCase;
