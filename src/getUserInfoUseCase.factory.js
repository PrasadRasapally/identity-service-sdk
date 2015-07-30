(function () {

    angular
        .module("identityServiceSdk.module")
        .factory(
        "identityServiceSdk.getUserInfoUseCase",
        [
            "$q",
            "$http",
            "identityServiceSdk.config",
            getUserInfoUseCase
        ]);

    function getUserInfoUseCase($q,
                                $http,
                                config) {

        return {
            execute: execute
        };

        /**
         * Gets userInfo via the provided access token.
         * @param {String} accessToken
         * @returns a promise of {OidcUserInfo}
         */
        function execute(accessToken) {

            return $http(
                {
                    headers: {
                        Authorization: "Bearer " + accessToken
                    },
                    method: "get",
                    url: config.baseUrl + "/oauth2/userinfo"
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
