import {Container} from 'aurelia-dependency-injection';
import DiContainer from './diContainer';
import GetUserInfoUseCase from './getUserInfoUseCase';
import RefreshAccessTokenUseCase from './refreshAccessTokenUseCase';
import IdentityServiceSdkConfig from './identityServiceSdkConfig';
import OidcUserInfo from './oidcUserInfo';

/**
 * @class {IdentityServiceSdk}
 */
export default class IdentityServiceSdk {

    _diContainer:DiContainer;

    /**
     * @param {IdentityServiceSdkConfig} config
     */
    constructor(config:IdentityServiceSdkConfig) {

        this._diContainer = new DiContainer(config);

    }

    /**
     * @param {string} accessToken
     * @returns {Promise<OidcUserInfo>}
     */
    getUserInfo(accessToken:string):Promise<OidcUserInfo> {

        return this
            ._diContainer
            .get(GetUserInfoUseCase)
            .execute(accessToken);

    }

    /**
     * @param {string} accessToken
     * @returns {Promise<string>}
     */
    refreshAccessToken(accessToken:string):Promise<string> {

        return this
            ._diContainer
            .get(RefreshAccessTokenUseCase)
            .execute(accessToken);

    }

}