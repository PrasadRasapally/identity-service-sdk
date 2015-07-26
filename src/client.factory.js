(function () {
    angular
        .module("identityServiceModule")
        .factory(
        "identityServiceClient",
        [
            "identityServiceConfig",
            "$http",
            "localStorageService",
            "ssoLoginUrlFactory",
            "$q",
            identityServiceClient
        ]);

    function identityServiceClient(identityServiceConfig,
                                   $http,
                                   localStorageService,
                                   ssoLoginUrlFactory,
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
            getSsoLoginUrl: ssoLoginUrlFactory.construct,
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
