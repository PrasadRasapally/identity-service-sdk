class GetUserInfoUseCase {

    constructor($q,
                $http,
                config) {

        this.$q = $q;
        this.$http = $http;
        this.config = config;

    }

    /**
     * Gets userInfo via the provided access token.
     * @param {String} accessToken
     * @returns a promise of {OidcUserInfo}
     */
    execute(accessToken) {

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

GetUserInfoUseCase.$inject = [
    "$q",
    "$http",
    "identityServiceSdk.config"
];

export default GetUserInfoUseCase;
