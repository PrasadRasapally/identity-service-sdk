(function () {
    angular
        .module("identityServiceSdk.module")
        .factory(
        "identityServiceSdk",
        [
            "identityServiceSdk.getAccessTokenUseCase",
            "identityServiceSdk.getUserInfoUseCase",
            "identityServiceSdk.loginWithSamlUseCase",
            "identityServiceSdk.logoutUseCase",
            identityServiceSdk
        ]);

    function identityServiceSdk(getAccessTokenUseCase,
                                getUserInfoUseCase,
                                loginWithSamlUseCase,
                                logoutUseCase) {

        return {
            getAccessToken: getAccessTokenUseCase.execute,
            getUserInfo: getUserInfoUseCase.execute,
            loginWithSaml: loginWithSamlUseCase.execute,
            logout: logoutUseCase.execute
        }

    }
})();
