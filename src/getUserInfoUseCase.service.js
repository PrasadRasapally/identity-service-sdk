class GetUserInfoUseCase {

    constructor($q,
                $http,
                config) {

        this._$q = $q;
        this._$http = $http;
        this._config = config;

    }

    /**
     * Gets userInfo via the provided access token.
     * @param {String} accessToken
     * @returns a promise of {OidcUserInfo}
     */
    execute(accessToken) {

        return this._$http(
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                },
                method: 'get',
                url: `${this._config.baseUrl}/oauth2/userinfo`
            })
            .then((response) =>
                (response.data));
    }

}

GetUserInfoUseCase.$inject = [
    '$q',
    '$http',
    'identityServiceSdk.config'
];

export default GetUserInfoUseCase;
