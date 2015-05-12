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

        var thisProvider = {
            setBaseUrl: setBaseUrl,
            setIdentityServiceBaseUrl: setIdentityServiceBaseUrl,
            setSamlIdpUrl: setSamlIdpUrl,
            $get: $get
        };

        return thisProvider;

        function setBaseUrl(baseUrl) {
            thisProvider.baseUrl = baseUrl;
            return thisProvider;
        }

        function setIdentityServiceBaseUrl(identityServiceBaseUrl) {
            thisProvider.identityServiceBaseUrl = identityServiceBaseUrl;
            return thisProvider;
        }

        function setSamlIdpUrl(samlIdpUrl) {
            thisProvider.samlIdpUrl = samlIdpUrl;
            return thisProvider;
        }

        function $get(){
            return {
                baseUrl:thisProvider.baseUrl,
                identityServiceBaseUrl:thisProvider.identityServiceBaseUrl,
                samlIdpUrl:thisProvider.samlIdpUrl
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
            identityServiceClient
        ]);

    function identityServiceClient(identityServiceConfig,
                                                $http,
                                                $q,
                                                localStorageService) {

        return {
            getUserInfo: getUserInfo,
            setAccessToken: setAccessToken
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