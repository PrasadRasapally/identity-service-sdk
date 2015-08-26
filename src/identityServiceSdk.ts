import {Container} from 'aurelia-dependency-injection';
import DiContainerFactory from './diContainerFactory';
import GetUserInfoUseCase from './getUserInfoUseCase';
import RefreshAccessTokenUseCase from './refreshAccessTokenUseCase';
import {IdentityServiceSdkConfig} from './identityServiceSdkConfig';

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

    getUserInfo(accessToken) {

        return this
            ._diContainer
            .get(GetUserInfoUseCase)
            .execute(accessToken);

    }

    refreshAccessToken(accessToken) {

        return this
            ._diContainer
            .get(RefreshAccessTokenUseCase)
            .execute(accessToken);

    }

}