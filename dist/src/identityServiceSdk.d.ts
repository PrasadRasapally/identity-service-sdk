import { IdentityServiceSdkConfig } from './identityServiceSdkConfig';
import OidcUserInfo from './oidcUserInfo';
/**
 * @class IdentityServiceSdk
 * @constructor
 */
export declare class IdentityServiceSdk {
    private _diContainer;
    /**
     *
     * @param {IdentityServiceSdkConfig} config
     */
    constructor(config: IdentityServiceSdkConfig);
    getUserInfo(accessToken: string): Promise<OidcUserInfo>;
    refreshAccessToken(accessToken: string): Promise<string>;
}
