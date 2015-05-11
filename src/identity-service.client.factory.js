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
