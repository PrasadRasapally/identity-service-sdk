class RefreshAccessTokenUseCase {

    constructor($q,
                $httpParamSerializer,
                $http,
                config) {

        this._$q = $q;
        this._$httpParamSerializer = $httpParamSerializer;
        this._$http = $http;
        this._config = config;

    }

    /**
     * Refreshes the provided access token. Primarily used to refresh an access token for the
     * purposes of maintaining an active session without redirecting the client browser to re-authenticate.
     * @param {String} accessToken
     * @returns a promise of {String}
     */
    execute(accessToken) {

        return this._$http(
            {
                method: 'post',
                url: `${this._config.baseUrl}/oauth2/token`,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                data: this._$httpParamSerializer({
                    grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
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
                return this._$q.reject(response);
            });
    }

}

RefreshAccessTokenUseCase.$inject = [
    '$q',
    '$httpParamSerializer',
    '$http',
    'identityServiceSdk.config'
];

export default RefreshAccessTokenUseCase