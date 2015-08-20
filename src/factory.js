class IdentityServiceSdk {

    constructor(getUserInfoUseCase,
                refreshAccessTokenUseCase) {

        this.getUserInfoUseCase = getUserInfoUseCase.execute;
        this.refreshAccessTokenUseCase = refreshAccessTokenUseCase.execute;

    }

}

IdentityServiceSdk.$inject = [
    "identityServiceSdk.getUserInfoUseCase",
    "identityServiceSdk.refreshAccessTokenUseCase"
];

export default IdentityServiceSdk
