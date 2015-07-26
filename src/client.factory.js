(function () {
    angular
        .module("identityServiceModule")
        .factory(
        "identityServiceClient",
        [
            "identityServiceConfig",
            "$http",
            "localStorageService",
            identityServiceClient
        ]);

    function identityServiceClient(identityServiceConfig,
                                   $http,
                                   localStorageService) {

        /*
         API
         */
        return {
            getCurrentAccessToken: getCurrentAccessToken,
            setCurrentAccessToken: setCurrentAccessToken,
            logout: logout,
            getUserInfo: getUserInfo
        };

        /*
         methods
         */

        /**
         * Retrieves the current access_token from browser storage. Primarily used to build an
         * Authorization header to make an API call to a protected resource.
         * @returns {string}
         */
        function getCurrentAccessToken() {
            return localStorageService.get("accessToken");
        }

        /**
         * Sets the current access_token in browser storage.
         * @param {string} accessToken
         */
        function setCurrentAccessToken(accessToken) {

            localStorageService.set("accessToken", accessToken);

        }

        /**
         * Logs out the currently logged in user by:
         * 1) removing their accessToken from localStorage
         * 2) redirecting them to the configured logoutUrl
         * Executes callbacks previously passed to {@link subscribeToLogoutEvents}
         */
        function logout() {

            localStorageService.remove("accessToken");

            // redirect to logoutUrl
            $window.location = identityServiceConfig.logoutUrl;

        }

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
        function getUserInfo() {

            return $http({
                headers: {
                    Authorization: "Bearer " + getCurrentAccessToken()
                },
                method: "get",
                url: identityServiceConfig.baseUrl + "/oauth2/userinfo"
            }).then(function (response) {
                return response.data;
            });
        }
    }
})();
