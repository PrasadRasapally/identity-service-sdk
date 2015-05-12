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
            setIdentityServiceBaseUrl: setIdentityServiceBaseUrl,
            setSamlIdpUrl: setSamlIdpUrl,
            $get: $get
        };

        return objectUnderConstruction;

        function setBaseUrl(baseUrl) {
            objectUnderConstruction.baseUrl = baseUrl;
            return objectUnderConstruction;
        }

        function setIdentityServiceBaseUrl(identityServiceBaseUrl) {
            objectUnderConstruction.identityServiceBaseUrl = identityServiceBaseUrl;
            return objectUnderConstruction;
        }

        function setSamlIdpUrl(samlIdpUrl) {
            objectUnderConstruction.samlIdpUrl = samlIdpUrl;
            return objectUnderConstruction;
        }

        function $get(){
            return {
                baseUrl:objectUnderConstruction.baseUrl,
                identityServiceBaseUrl:objectUnderConstruction.identityServiceBaseUrl,
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
            '$location',
            identityServiceClient
        ]);

    function identityServiceClient(identityServiceConfig,
                                   $http,
                                   $q,
                                   localStorageService,
                                   $location) {

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
         */
        function getSsoLoginUrl() {
            var samlIdpUrl = identityServiceConfig.samlIdpUrl;

            // the url to return to after successfully logging in.
            var relayState = $location.protocol()
                + "://"
                + $location.host()
                + ":"
                + $location.port()
                + "/#/identity-service/redirect-endpoint";

            // determine appropriate prefix for relay state parameter
            var relayStatePrefix = "?";
            if (1 > samlIdpUrl.indexOf('?')) {
                relayStatePrefix = "&";
            }

            return identityServiceConfig.samlIdpUrl
                + relayStatePrefix
                + "RelayState="
                + relayState.encodeURIComponent();
        }

        /**
         * gets the user info of the current user
         * @returns {UserInfo}
         */
        function getUserInfo() {
            var request = $http({
                headers: {
                    Authorization: getAccessToken()
                },
                method: "get",
                url: identityServiceConfig.identityServiceBaseUrl + "/userinfo"
            });

            return request
                .then(
                handleSuccess,
                handleError
            );
        }

        function setAccessToken(accessToken) {
            localStorageService.set('accessToken', accessToken);
        }

        function getAccessToken() {
            return localStorageService.get('accessToken');
        }

        function handleError(response) {
            if (
                !angular.isObject(response.data) || !response.data.message
            ) {

                return ( $q.reject("An unknown error occurred.") );

            }

            // Otherwise, use expected error message.
            return ( $q.reject(response.data.message) );

        }

        function handleSuccess(response) {

            return ( response.data );

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

        // consume path parameter
        var pathParameterName = 'path';
        var path = $location.search()[pathParameterName];
        $location.search(pathParameterName, null);

        // go to path
        $location.path(path);
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