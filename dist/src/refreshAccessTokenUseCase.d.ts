import { HttpClient } from 'aurelia-http-client';
import { IdentityServiceSdkConfig } from './identityServiceSdkConfig';
/**
 * @class RefreshAccessTokenUseCase
 * @constructor
 */
declare class RefreshAccessTokenUseCase {
    private _httpClient;
    private _config;
    constructor(httpClient: HttpClient, config: IdentityServiceSdkConfig);
    /**
     * Refreshes the provided access token. Primarily used to refresh an access token for the
     * purposes of maintaining an active session without redirecting the client browser to re-authenticate.
     * @param {string} accessToken
     * @returns {Promise<string>}
     */
    execute(accessToken: string): Promise<string>;
}
export default RefreshAccessTokenUseCase;
