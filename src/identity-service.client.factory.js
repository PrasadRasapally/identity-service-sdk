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
                                   localStorageService) {

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
         * @param {string} returnUrl - the url to return to after successfully logging in.
         */
        function getSsoLoginUrl() {
            var samlIdpUrl = identityServiceConfig.samlIdpUrl;

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
