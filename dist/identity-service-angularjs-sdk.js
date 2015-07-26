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
            "$q",
            identityServiceClient
        ]);

    function identityServiceClient(identityServiceConfig,
                                   $http,
                                   localStorageService,
                                   $window,
                                   $q) {

        /*
         fields
         */
        var loginCallbacks = [];
        var logoutCallbacks = [];

        /*
         API
         */
        return {
            getCurrentAccessToken: getCurrentAccessToken,
            getSsoLoginUrl: getSsoLoginUrl,
            login: login,
            logout: logout,
            subscribeToLoginEvents: subscribeToLoginEvents,
            subscribeToLogoutEvents: subscribeToLogoutEvents,
            tryGetUserInfoWithCurrentAccessToken: tryGetUserInfoWithCurrentAccessToken
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
         * Logs the user in with the provided accessToken and saves it to browser localStorage.
         * Executes callbacks previously passed to {@link subscribeToLoginEvents}
         * @param {string} accessToken
         */
        function login(accessToken) {

            localStorageService.set("accessToken", accessToken);

            tryGetUserInfoWithCurrentAccessToken()
                .then(function (oidcUserInfo) {

                    for (var i = 0; i < loginCallbacks.length; i++) {
                        loginCallbacks[i](oidcUserInfo);
                    }

                });

        }

        /**
         * Logs out the currently logged in user and removes their accessToken from localStorage.
         * Executes callbacks previously passed to {@link subscribeToLogoutEvents}
         */
        function logout() {

            localStorageService.remove("accessToken");

            for (var i = 0; i < logoutCallbacks.length; i++) {
                logoutCallbacks[i]();
            }

        }

        /**
         * Subscribes a callback to login events. In the event of a login the callback will be invoked
         * with the logged in users info.
         * @param {function} callback
         */
        function subscribeToLoginEvents(callback) {
            loginCallbacks.push(callback);
        }

        /**
         * Subscribes a callback to logout events. In the event of a logout for any reason the callback
         * will be invoked.
         * @param {function} callback
         */
        function subscribeToLogoutEvents(callback) {
            logoutCallbacks.push(callback);
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
         * Attempts to get userInfo with the current accessToken.
         * Primarily used to obtain user info upon initial page load.
         * @returns a promise of {(OidcUserInfo|null)}
         */
        function tryGetUserInfoWithCurrentAccessToken() {

            var accessToken = getCurrentAccessToken();

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
                deferred.reject("no access token exists");
                return deferred.promise;
            }
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

        $httpProvider.interceptors.push(http401ResponseInterceptorProvider);

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
        .provider(
        "http401ResponseInterceptor",
        http401ResponseInterceptorProvider);

    function http401ResponseInterceptorProvider() {

        return {
            $get: [
                "$q",
                "identityServiceClient",
                "$location",
                "$window",
                $get]
        };

        function $get($q,
                      identityServiceClient,
                      $location,
                      $window) {
            return {
                response: function (response) {
                    if (response.status === 401) {
                        console.log("Response 401");
                    }
                    return response || $q.when(response);
                },
                responseError: function (rejection) {
                    if (rejection.status === 401) {
                        console.log("Response Error 401", rejection);
                        $window.location = identityServiceClient.getSsoLoginUrl($location.path());
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
        identityServiceClient.login(accessToken);
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