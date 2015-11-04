import {inject} from 'aurelia-dependency-injection';
import {HttpClient} from 'aurelia-http-client';
import IdentityServiceSdkConfig from './identityServiceSdkConfig';
import OidcUserInfo from './oidcUserInfo';
import OidcUserInfoFactory from './oidcUserInfoFactory';

/**
 * @class {GetUserInfoFeature}
 */
@inject(HttpClient, IdentityServiceSdkConfig) class GetUserInfoFeature {

    _httpClient:HttpClient;

    _config:IdentityServiceSdkConfig;

    /**
     * @param {HttpClient} httpClient
     * @param {IdentityServiceSdkConfig} config
     */
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
            .withBaseUrl(this._config.precorConnectApiBaseUrl)
            .withHeader('Authorization', `Bearer ${accessToken}`)
            .send()
            .then((response) => OidcUserInfoFactory.construct(response.content));

    }

}

export default GetUserInfoFeature;
