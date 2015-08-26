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

    private _diContainer:Container;

    /**
     *
     * @param {IdentityServiceSdkConfig} config
     */
    constructor(config:IdentityServiceSdkConfig) {

        this._diContainer = new DiContainerFactory(config).construct();

    }

    getUserInfo(accessToken:String):Promise<OidcUserInfo> {

        return this
            ._diContainer
            .get(GetUserInfoUseCase)
            .execute(accessToken);

    }

    refreshAccessToken(accessToken:String):Promise<String> {

        return this
            ._diContainer
            .get(RefreshAccessTokenUseCase)
            .execute(accessToken);

    }

}