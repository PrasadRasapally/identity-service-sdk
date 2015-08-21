class IdentityServiceSdk {

    constructor(getUserInfoUseCase,
                refreshAccessTokenUseCase) {

        this.getUserInfo = getUserInfoUseCase.execute;
        this.refreshAccessToken = refreshAccessTokenUseCase.execute;

    }

}

IdentityServiceSdk.$inject = [
    'identityServiceSdk.getUserInfoUseCase',
    'identityServiceSdk.refreshAccessTokenUseCase'
];

export default IdentityServiceSdk
