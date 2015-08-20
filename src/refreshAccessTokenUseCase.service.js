class RefreshAccessTokenUseCase {

    constructor($q,
                $httpParamSerializer,
                $http,
                config) {

        this.$q = $q;
        this.$httpParamSerializer = $httpParamSerializer;
        this.$http = $http;
        this.config = config;

    }

    /**
     * Refreshes the provided access token. Primarily used to refresh an access token for the
     * purposes of maintaining an active session without redirecting the client browser to re-authenticate.
     * @param {String} accessToken
     * @returns a promise of {String}
     */
    execute(accessToken) {

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
                return response.data.access_token;
            },
            /*
             passthru $http rejection since we can't handle it here
             */
            function (response) {
                return $q.reject(response);
            });
    }

}

RefreshAccessTokenUseCase.$inject = [
    "$q",
    "$httpParamSerializer",
    "$http",
    "identityServiceSdk.config"
];

export default RefreshAccessTokenUseCase