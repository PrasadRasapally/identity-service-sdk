import DiContainerFactory from "./diContainerFactory";
import GetUserInfoUseCase from "./getUserInfoUseCase";
import RefreshAccessTokenUseCase from "./refreshAccessTokenUseCase";

/**
 * @class IdentityServiceSdk
 * @constructor
 */
export default class IdentityServiceSdk {

    /**
     *
     * @param {IdentityServiceSdkConfig} config
     */
    constructor(config) {

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