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
