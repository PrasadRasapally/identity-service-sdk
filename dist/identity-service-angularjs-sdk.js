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
            "localStorageService",
            "$window",
            identityServiceClient
        ]);

    function identityServiceClient(identityServiceConfig,
                                   $http,
                                   localStorageService,
                                   $window) {

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

(function () {
    angular
        .module("identityServiceModule")
        .config([
            "$httpProvider",
            "http401ResponseInterceptorProvider",
            config]);

    function config($httpProvider,
                    http401ResponseInterceptorProvider) {

        $httpProvider.interceptors.push(http401ResponseInterceptorProvider.$get);

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
            setLogoutUrl: setLogoutUrl,
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

        function setLogoutUrl(logoutUrl) {
            objectUnderConstruction.logoutUrl = logoutUrl;
            return objectUnderConstruction;
        }

        function $get() {
            return {
                baseUrl: objectUnderConstruction.baseUrl,
                samlIdpUrl: objectUnderConstruction.samlIdpUrl,
                logoutUrl: objectUnderConstruction.logoutUrl
            };

        }
    }
})();
(function () {
    angular
        .module("identityServiceModule")
        .provider(
        "http401ResponseInterceptor",
        http401ResponseInterceptorProvider);

    function http401ResponseInterceptorProvider() {

        return {
            $get: [
                "$q",
                "ssoLoginUrlFactory",
                "$location",
                "$window",
                $get]
        };

        function $get($q,
                      ssoLoginUrlFactory,
                      $location,
                      $window) {
            return {
                responseError: function (rejection) {
                    if (rejection.status === 401) {
                        $window.location = ssoLoginUrlFactory.construct($location.path());
                    }
                    return $q.reject(rejection);
                }
            }
        }

    }
})
();

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

        // get search parameters
        var searchParams = $location.search();

        // replace current browser history record
        $location.replace();

        // consume access token parameter
        var accessTokenParameterName = "access_token";
        var accessToken = searchParams[accessTokenParameterName];
        identityServiceClient.setCurrentAccessToken(accessToken);
        searchParams[accessTokenParameterName] = null;

        // consume returnPath parameter
        var returnPathParameterName = "return_path";
        var returnPath = searchParams[returnPathParameterName];
        searchParams[returnPathParameterName] = null;

        // redirect to returnPath & replace current browser history record
        $location.search(searchParams);
        $location.path(returnPath);

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
(function () {
    angular
        .module("identityServiceModule")
        .service("ssoLoginUrlFactory",
        [
            "$window",
            "identityServiceConfig",
            ssoLoginUrlFactory]);

    function ssoLoginUrlFactory($window,
                                identityServiceConfig) {

        return {
            construct: construct
        };

        /**
         * Constructs a URL for initiating a SSO login flow and persisting the
         * resulting access_token to browser storage.
         * @param {string} returnPath - The angular path to route to following successful login
         */
        function construct(returnPath) {

            // the url to return to after successfully logging in.
            var relayState = $window.location.protocol
                + "//"
                + $window.location.host
                + $window.location.pathname
                + "#/identity-service/redirect-endpoint?access_token={access_token}&return_path="
                + returnPath;

            // determine appropriate prefix for relay state parameter
            var relayStatePrefix = "&";
            if (1 > identityServiceConfig.samlIdpUrl.indexOf("?")) {
                relayStatePrefix = "?";
            }

            return identityServiceConfig.samlIdpUrl
                + relayStatePrefix
                + "RelayState="
                + encodeURIComponent(relayState);
        }
    }
})();