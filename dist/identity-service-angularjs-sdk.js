(function () {
    angular.module(
        "identityServiceModule",
        [
            "ngRoute",
            "LocalStorageModule"
        ]);
})();
(function () {
    angular
        .module("identityServiceModule")
        .factory(
        "identityServiceClient",
        [
            "identityServiceConfig",
            "$http",
            "$q",
            "localStorageService",
            "$window",
            identityServiceClient
        ]);

    function identityServiceClient(identityServiceConfig,
                                   $http,
                                   $q,
                                   localStorageService,
                                   $window) {

        return {
            getSsoLoginUrl: getSsoLoginUrl,
            getUserInfo: getUserInfo,
            setAccessToken: setAccessToken,
            getAccessToken: getAccessToken
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
         * Gets a URL for initiating a SSO login flow and persists the resulting access_token to browser storage.
         * @param {string} returnPath - The angular path to route to following successful login
         */
        function getSsoLoginUrl(returnPath) {
            var samlIdpUrl = identityServiceConfig.samlIdpUrl;

            // the url to return to after successfully logging in.
            var relayState = $window.location.protocol
                + "//"
                + $window.location.host
                + $window.location.pathname
                + "#/identity-service/redirect-endpoint?access_token={access_token}&return_path="
                + returnPath;

            // determine appropriate prefix for relay state parameter
            var relayStatePrefix = "&";
            if (1 > samlIdpUrl.indexOf("?")) {
                relayStatePrefix = "?";
            }

            return identityServiceConfig.samlIdpUrl
                + relayStatePrefix
                + "RelayState="
                + encodeURIComponent(relayState);
        }

        /**
         * gets the user info of the current user
         * @returns {OidcUserInfo|null} the current users info or null if a valid access_token is not available
         */
        function getUserInfo() {
            var accessToken = getAccessToken();
            if (accessToken) {
                return $http({
                    headers: {
                        Authorization: "Bearer " + accessToken
                    },
                    method: "get",
                    url: identityServiceConfig.baseUrl + "/oauth2/userinfo"
                }).then(function (response) {
                    return response.data;
                });
            }
            else {
                var deferred = $q.defer();
                deferred.resolve(null);
                return deferred.promise;
            }
        }

        function setAccessToken(accessToken) {
            localStorageService.set("accessToken", accessToken);
        }

        function getAccessToken() {
            return localStorageService.get("accessToken");
        }
    }
})();

(function () {
    angular
        .module("identityServiceModule")
        .provider(
        "identityServiceConfig",
        identityServiceConfigProvider
    );

    function identityServiceConfigProvider() {

        var objectUnderConstruction = {
            setBaseUrl: setBaseUrl,
            setSamlIdpUrl: setSamlIdpUrl,
            $get: $get
        };

        return objectUnderConstruction;

        function setBaseUrl(baseUrl) {
            objectUnderConstruction.baseUrl = baseUrl;
            return objectUnderConstruction;
        }

        function setSamlIdpUrl(samlIdpUrl) {
            objectUnderConstruction.samlIdpUrl = samlIdpUrl;
            return objectUnderConstruction;
        }

        function $get(){
            return {
                baseUrl:objectUnderConstruction.baseUrl,
                samlIdpUrl:objectUnderConstruction.samlIdpUrl
            }
        }
    }
})();
(function () {

    angular
        .module("identityServiceModule")
        .controller(
        "IdentityServiceRedirectEndpointController",
        [
            "identityServiceClient",
            "$location",
            IdentityServiceRedirectEndpointController
        ]);

    function IdentityServiceRedirectEndpointController(identityServiceClient,
                                                       $location) {

        // consume access token parameter
        var accessTokenParameterName = "access_token";
        var accessToken = $location.search()[accessTokenParameterName];
        identityServiceClient.setAccessToken(accessToken);

        // consume returnPath parameter
        var returnPathParameterName = "return_path";
        var returnPath = $location.search()[returnPathParameterName];

        // redirect to returnPath & replace current browser history record
        // note: at time of writing this but is still open: https://github.com/angular/angular.js/issues/12168
        $location
            .path(returnPath)
            .search(accessTokenParameterName, null)
            .search(returnPathParameterName, null)
            .replace();
    }
})();

(function () {
    angular.module(
        "identityServiceModule")
        .config(
        [
            "$routeProvider",
            function ($routeProvider) {
                $routeProvider
                    .when
                (
                    "/identity-service/redirect-endpoint",
                    {
                        template: " ",
                        controller: "IdentityServiceRedirectEndpointController",
                        controllerAs:"controller"
                    }
                )
            }
        ]);
})();