(function () {
    angular
        .module("identityServiceSdk.module")
        .factory(
        "identityServiceSdk.loginWithSamlUseCase",
        [
            "identityServiceSdk.loginWithSamlService",
            loginWithSamlUseCase
        ]);

    function loginWithSamlUseCase(loginWithSamlService) {

        return {
            execute: execute
        };

        /**
         * Logs a user in by:
         * 1.  initiates a SAML 2.0 SP initiated Redirect POST login flow
         * 2.  sets the resulting access token in browser storage such that it will be returned
         * by identityServiceSdk.getCurrentAccessToken
         */
        function execute() {

            loginWithSamlService.execute();

        }
    }
})();