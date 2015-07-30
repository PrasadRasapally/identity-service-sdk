(function () {

    angular
        .module("identityServiceSdk.module")
        .factory(
        "identityServiceSdk.refreshAccessTokenUseCase",
        [
            "$q",
            "$httpParamSerializer",
            "$http",
            "identityServiceSdk.config",
            refreshAccessTokenUseCase
        ]);

    function refreshAccessTokenUseCase($q,
                                       $httpParamSerializer,
                                       $http,
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
                    data: $httpParamSerializer({
                        grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
                        assertion: accessToken
                    })
                })
                .then(
                function (response) {
                    return response.data;
                },
                /*
                 passthru $http rejection since we can't handle it here
                 */
                function (response) {
                    return $q.reject(response);
                });
        }
    }

})();
