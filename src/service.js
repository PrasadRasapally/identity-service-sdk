class IdentityServiceSdk {

    constructor(getUserInfoUseCase,
                refreshAccessTokenUseCase) {

        this._getUserInfoUseCase = getUserInfoUseCase;
        this._refreshAccessTokenUseCase = refreshAccessTokenUseCase;

    }

    getUserInfo(accessToken) {
        return this._getUserInfoUseCase.execute(accessToken);
    }

    refreshAccessToken(accessToken) {
        return this._refreshAccessTokenUseCase.execute(accessToken);
    }

}

IdentityServiceSdk.$inject = [
    'identityServiceSdk.getUserInfoUseCase',
    'identityServiceSdk.refreshAccessTokenUseCase'
];

export default IdentityServiceSdk
