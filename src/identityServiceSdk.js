import DiContainerFactory from "./diContainerFactory";
import GetUserInfoUseCase from "./getUserInfoUseCase";
import RefreshAccessTokenUseCase from "./refreshAccessTokenUseCase";

export default class IdentityServiceSdk {

    /**
     *
     * @param {IdentityServiceSdkConfig} config
     */
    constructor(config) {

        this._diContainer =
            DiContainerFactory.construct(config);

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