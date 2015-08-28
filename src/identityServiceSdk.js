import {Container} from 'aurelia-dependency-injection';
import DiContainerFactory from './diContainerFactory';
import GetUserInfoUseCase from './getUserInfoUseCase';
import RefreshAccessTokenUseCase from './refreshAccessTokenUseCase';
import {IdentityServiceSdkConfig} from './identityServiceSdkConfig';
import OidcUserInfo from './oidcUserInfo';

/**
 * @class IdentityServiceSdk
 * @constructor
 */
export class IdentityServiceSdk {

    _diContainer:Container;

    /**
     *
     * @param {IdentityServiceSdkConfig} config
     */
    constructor(config:IdentityServiceSdkConfig) {

        this._diContainer = new DiContainerFactory(config).construct();

    }

    getUserInfo(accessToken:string):Promise<OidcUserInfo> {

        return this
            ._diContainer
            .get(GetUserInfoUseCase)
            .execute(accessToken);

    }

    refreshAccessToken(accessToken:string):Promise<string> {

        return this
            ._diContainer
            .get(RefreshAccessTokenUseCase)
            .execute(accessToken);

    }

}