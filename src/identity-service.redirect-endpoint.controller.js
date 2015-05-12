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
        console.log(accessToken);
        identityServiceClient.setAccessToken(accessToken);
        $location.search(accessTokenParameterName, null);

        // consume returnPath parameter
        var returnPathParameterName = 'return_path';
        var returnPath = $location.search()[returnPathParameterName];
        $location.search(returnPathParameterName, null);

        // go to returnPath
        $location.path(returnPath);
    }
})();
