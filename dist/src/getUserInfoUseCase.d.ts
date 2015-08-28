import { HttpClient } from 'aurelia-http-client';
import { IdentityServiceSdkConfig } from './identityServiceSdkConfig';
import OidcUserInfo from './oidcUserInfo';
/**
 * @class GetUserInfoUseCase
 * @constructor
 */
declare class GetUserInfoUseCase {
    private _httpClient;
    private _config;
    constructor(httpClient: HttpClient, config: IdentityServiceSdkConfig);
    /**
     * Gets userInfo via the provided access token.
     * @param {string} accessToken
     * @returns {Promise<OidcUserInfo>}
     */
    execute(accessToken: string): Promise<OidcUserInfo>;
}
export default GetUserInfoUseCase;
