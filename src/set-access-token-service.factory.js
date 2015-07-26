(function () {
    angular
        .module("identityServiceSdk.module")
        .factory(
        "identityServiceSdk.setAccessTokenService",
        [
            "localStorageService",
            setAccessTokenService
        ]);

    /**
     * Sets the current access_token in browser storage.
     * @param {string} accessToken
     */
    function setAccessTokenService(localStorageService) {

        return {
            execute: execute
        };

        function execute(accessToken) {

            localStorageService.set("accessToken", accessToken);

        }
    }
})();
