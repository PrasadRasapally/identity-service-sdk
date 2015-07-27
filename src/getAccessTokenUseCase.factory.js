(function () {
    angular
        .module("identityServiceSdk.module")
        .factory(
        "identityServiceSdk.getAccessTokenUseCase",
        [
            "identityServiceSdk.getAccessTokenService",
            getAccessTokenUseCase
        ]);

    function getAccessTokenUseCase(getAccessTokenService) {

        return {
            execute: execute
        };

        /**
         * Retrieves the current access_token from browser storage. Primarily used to build an
         * Authorization header to make an API call to a protected resource.
         * @returns {string}
         */
        function execute() {
            return getAccessTokenService.execute();
        }
    }
})();
