(function () {
    angular
        .module("identityServiceSdk.module")
        .factory(
        "identityServiceSdk.getAccessTokenService",
        [
            "localStorageService",
            getAccessTokenService
        ]);

    function getAccessTokenService(localStorageService) {

        return {
            execute: execute
        };

        /**
         * Retrieves the current access_token from browser storage. Primarily used to build an
         * Authorization header to make an API call to a protected resource.
         * @returns {string}
         */
        function execute() {
            return localStorageService.get("accessToken");
        }
    }
})();
