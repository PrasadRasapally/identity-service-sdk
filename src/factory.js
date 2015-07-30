(function () {
    angular
        .module("identityServiceSdk.module")
        .factory(
        "identityServiceSdk",
        [
            "identityServiceSdk.getUserInfoUseCase",
            "identityServiceSdk.refreshAccessTokenUseCase",
            identityServiceSdk
        ]);

    function identityServiceSdk(getUserInfoUseCase,
                                refreshAccessTokenUseCase) {

        return {
            getUserInfo: getUserInfoUseCase.execute,
            refreshAccessToken: refreshAccessTokenUseCase.execute
        }

    }
})();
