(function () {
    angular
        .module(
        "identityServiceSdk.module",
        [
            "ngRoute",
            "LocalStorageModule"
        ]);
})();
(function () {
    angular
        .module("identityServiceSdk.module")
        .provider("identityServiceSdk.config",
        configProvider
    );

    function configProvider() {

        var objectUnderConstruction = {
            setBaseUrl: setBaseUrl,
            setSamlLoginUrl: setSamlLoginUrl,
            setLogoutUrl: setLogoutUrl,
            $get: $get
        };

        return objectUnderConstruction;

        function setBaseUrl(baseUrl) {
            objectUnderConstruction.baseUrl = baseUrl;
            return objectUnderConstruction;
        }

        function setSamlLoginUrl(samlLoginUrl) {
            objectUnderConstruction.samlLoginUrl = samlLoginUrl;
            return objectUnderConstruction;
        }

        function setLogoutUrl(logoutUrl) {
            objectUnderConstruction.logoutUrl = logoutUrl;
            return objectUnderConstruction;
        }

        function $get() {
            return {
                baseUrl: objectUnderConstruction.baseUrl,
                samlLoginUrl: objectUnderConstruction.samlLoginUrl,
                logoutUrl: objectUnderConstruction.logoutUrl
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
            "identityServiceSdk.getAccessTokenUseCase",
            "identityServiceSdk.getUserInfoUseCase",
            "identityServiceSdk.loginWithSamlUseCase",
            "identityServiceSdk.logoutUseCase",
            identityServiceSdk
        ]);

    function identityServiceSdk(getAccessTokenUseCase,
                                getUserInfoUseCase,
                                loginWithSamlUseCase,
                                logoutUseCase) {

        return {
            getAccessToken: getAccessTokenUseCase.execute,
            getUserInfo: getUserInfoUseCase.execute,
            loginWithSaml: loginWithSamlUseCase.execute,
            logout: logoutUseCase.execute
        }

    }
})();

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
            return getAccessTokenService.execute;
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

                    /*if (response.status === 401) {
                        loginWithSamlService.execute();
                    }*/

                });
        }
    }

})();

(function () {
    angular
        .module("identityServiceSdk.module")
        .service("identityServiceSdk.loginUrlFactory",
        [
            "$window",
            "identityServiceSdk.config",
            loginUrlFactory
        ]);

    function loginUrlFactory($window,
                             config) {

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
            if (1 > config.samlLoginUrl.indexOf("?")) {
                relayStatePrefix = "?";
            }

            return config.samlLoginUrl
                + relayStatePrefix
                + "RelayState="
                + encodeURIComponent(relayState);
        }
    }
})();
(function () {
    angular
        .module("identityServiceSdk.module")
        .factory(
        "identityServiceSdk.loginWithSamlService",
        [
            "identityServiceSdk.loginUrlFactory",
            "$location",
            "$window",
            loginWithSamlService
        ]
    );

    function loginWithSamlService(loginUrlFactory,
                          $location,
                          $window) {

        return {
            execute: execute
        };


        function execute() {

            $window.location = loginUrlFactory.construct($location.path());

        }

    }

})();
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
(function () {

    angular
        .module("identityServiceSdk.module")
        .controller(
        "identityServiceSdk.RedirectEndpointController",
        [
            "identityServiceClient",
            "$location",
            RedirectEndpointController
        ]);

    function RedirectEndpointController(identityServiceClient,
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
    angular
        .module("identityServiceSdk.module")
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
                        controller: "identityServiceSdk.RedirectEndpointController",
                        controllerAs: "controller"
                    }
                )
            }
        ]);
})();
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
