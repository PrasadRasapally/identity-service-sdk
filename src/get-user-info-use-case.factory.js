(function () {

    angular
        .module("identityServiceSdk.module")
        .factory(
        "identityServiceSdk.getUserInfoUseCase",
        [
            "$http",
            "identityServiceSdk.config",
            "identityServiceSdk.getAccessTokenService",
            "identityServiceSdk.loginWithSamlService",
            getUserInfoUseCase
        ]);

    function getUserInfoUseCase($http,
                                config,
                                getAccessTokenService,
                                loginWithSamlService) {

        return {
            execute: execute
        };

        /**
         * OpenID Connect (OIDC) UserInfo
         * @typedef {Object} OidcUserInfo
         * @property {string} given_name
         * @property {string} family_name
         * @property {string} email
         * @property {string} type - either "partnerRep" or "employee"
         */

        /**
         * OpenID Connect (OIDC) UserInfo for a partner rep
         * @typedef {Object} PartnerRepOidcUserInfo
         * @augments {OidcUserInfo}
         * @property {number} sub
         * @property {(string|null)} partner_sap_account_number
         * @property {(string|null)} sap_vendor_number
         */

        /**
         * OpenID Connect (OIDC) UserInfo for an employee
         * @typedef {Object} EmployeeOidcUserInfo
         * @augments {OidcUserInfo}
         */

        /**
         * Gets userInfo for the current user.
         * @returns a promise of {OidcUserInfo}
         */
        function execute() {

            return $http({
                headers: {
                    Authorization: "Bearer " + getAccessTokenService.execute()
                },
                method: "get",
                url: config.baseUrl + "/oauth2/userinfo"
            })
                .then(function onFulfilled(response) {
                    return response.data;

                }, function onRejected(response) {

                    // if we're on the redirect endpoint don't re-authenticate; can cause infinite loop
                    if ($location.path() == "/identity-service/redirect-endpoint") {
                        return response;
                    }
                    else if (response.status === 401) {
                        loginWithSamlService.execute();
                    }

                });
        }
    }

})();
