(function () {
    angular
        .module(
        "identityServiceSdk.module",
        [
            "ngRoute",
            "LocalStorageModule"
        ]);
})();
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
(function () {
    angular
        .module("identityServiceSdk.module")
        .provider("identityServiceSdk.config",
        configProvider
    );

    function configProvider() {

        var objectUnderConstruction = {
            setBaseUrl: setBaseUrl,
            $get: $get
        };

        return objectUnderConstruction;

        function setBaseUrl(baseUrl) {
            objectUnderConstruction.baseUrl = baseUrl;
            return objectUnderConstruction;
        }

        function $get() {
            return {
                baseUrl: objectUnderConstruction.baseUrl
            };

        }
    }
})();
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

(function () {

    angular
        .module("identityServiceSdk.module")
        .factory(
        "identityServiceSdk.getUserInfoUseCase",
        [
            "$http",
            "identityServiceSdk.config",
            getUserInfoUseCase
        ]);

    function getUserInfoUseCase($http,
                                config) {

        return {
            execute: execute
        };

        /**
         * Gets userInfo via the provided access token.
         * @param {String} accessToken
         * @returns a promise of {OidcUserInfo}
         */
        function execute(accessToken) {

            return $http(
                {
                    headers: {
                        Authorization: "Bearer " + accessToken
                    },
                    method: "get",
                    url: config.baseUrl + "/oauth2/userinfo"
                })
                .then(function (response) {

                    return response.data;

                });
        }
    }

})();

(function () {

    angular
        .module("identityServiceSdk.module")
        .factory(
        "identityServiceSdk.refreshAccessTokenUseCase",
        [
            "$http",
            "identityServiceSdk.config",
            refreshAccessTokenUseCase
        ]);

    function refreshAccessTokenUseCase($http,
                                       config) {

        return {
            execute: execute
        };

        /**
         * Refreshes the provided access token. Primarily used to refresh an access token for the
         * purposes of maintaining an active session without redirecting the client browser to re-authenticate.
         * @param {String} accessToken
         * @returns a promise of {String}
         */
        function execute(accessToken) {

            return $http(
                {
                    method: "post",
                    url: config.baseUrl + "/oauth2/token",
                    headers: {"Content-Type": "application/x-www-form-urlencoded"},
                    data: {
                        grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
                        assertion: accessToken
                    }
                })
                .then(function (response) {
                    return response.data;
                }
            );
        }
    }

})();
