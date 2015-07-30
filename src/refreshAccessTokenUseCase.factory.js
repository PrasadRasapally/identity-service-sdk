(function () {

    angular
        .module("identityServiceSdk.module")
        .factory(
        "identityServiceSdk.refreshAccessTokenUseCase",
        [
            "$http",
            "identityServiceSdk.config",
            refreshAccessTokenUseCase
        ]);

    function refreshAccessTokenUseCase($http,
                                       config) {

        return {
            execute: execute
        };

        /**
         * Refreshes the provided access token. Primarily used to refresh an access token for the
         * purposes of maintaining an active session without redirecting the client browser to re-authenticate.
         * @param {String} accessToken
         * @returns a promise of {String}
         */
        function execute(accessToken) {

            return $http(
                {
                    method: "post",
                    url: config.baseUrl + "/oauth2/token",
                    headers: {"Content-Type": "application/x-www-form-urlencoded"},
                    data: {
                        grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
                        assertion: accessToken
                    }
                })
                .then(function (response) {
                    return response.data;
                }
            );
        }
    }

})();
