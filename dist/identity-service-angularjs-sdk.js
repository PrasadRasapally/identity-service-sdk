(function () {
    angular.module(
        "identityServiceModule",
        [
            'ngRoute',
            'LocalStorageModule'
        ]);
})();
(function () {
    angular
        .module("identityServiceModule")
        .provider(
        'identityServiceConfig',
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
        .module('identityServiceModule')
        .factory(
        'identityServiceClient',
        [
            'identityServiceConfig',
            '$http',
            '$q',
            'localStorageService',
            '$window',
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
         * Info about a user
         * @typedef {Object} UserInfo
         * @property {string} firstName
         * @property {string} lastName
         * @property {string} emailAddress
         * @property {string} groupId
         * @property {string} sapVendorNumber
         * @property {string} sapAccountNumber
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
            if (1 > samlIdpUrl.indexOf('?')) {
                relayStatePrefix = "?";
            }

            return identityServiceConfig.samlIdpUrl
                + relayStatePrefix
                + "RelayState="
                + encodeURIComponent(relayState);
        }

        /**
         * gets the user info of the current user
         * @returns {UserInfo|null} the current users info or null if a valid access_token is not available
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
            localStorageService.set('accessToken', accessToken);
        }

        function getAccessToken() {
            return localStorageService.get('accessToken');
        }
    }
})();

(function () {

    angular
        .module('identityServiceModule')
        .controller(
        'IdentityServiceRedirectEndpoint',
        [
            'identityServiceClient',
            '$location',
            IdentityServiceRedirectEndpoint
        ]);

    function IdentityServiceRedirectEndpoint(identityServiceClient,
                                             $location) {

        // consume access token parameter
        var accessTokenParameterName = 'access_token';
        var accessToken = $location.search()[accessTokenParameterName];
        identityServiceClient.setAccessToken(accessToken);
        $location.search(accessTokenParameterName, null);
        console.log('access_token with signature ' + accessToken.split('.')[2] + ' processed');

        // consume returnPath parameter
        var returnPathParameterName = 'return_path';
        var returnPath = $location.search()[returnPathParameterName];
        $location.search(returnPathParameterName, null);
        console.log('return_path ' + returnPath + ' processed');

        // go to returnPath
        $location.path(returnPath);
    }
})();

(function () {
    angular.module(
        "identityServiceModule")
        .config(
        [
            '$routeProvider',
            function ($routeProvider) {
                $routeProvider
                    .when
                (
                    '/identity-service/redirect-endpoint',
                    {
                        template: ' ',
                        controller: 'IdentityServiceRedirectEndpoint'
                    }
                )
            }
        ]);
})();