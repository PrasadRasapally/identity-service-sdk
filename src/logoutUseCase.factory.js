(function () {
    angular
        .module("identityServiceSdk.module")
        .factory(
        "identityServiceSdk.logoutUseCase",
        [
            "$window",
            "identityServiceSdk.config",
            "localStorageService",
            logoutUseCase
        ]);

    /**
     * Logs out the currently logged in user by:
     * 1) removing their accessToken from localStorage
     * 2) redirecting them to the configured logoutUrl
     */
    function logoutUseCase($window,
                           config,
                           localStorageService) {

        return {
            execute: execute
        };

        function execute() {

            localStorageService.remove("accessToken");

            // redirect to logoutUrl
            $window.location = config.logoutUrl;

        }
    }
})();