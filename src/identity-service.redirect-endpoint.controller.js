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
        console.log('access_token with signature ' + accessToken.split('.')[2] + ' processed');

        // consume returnPath parameter
        var returnPathParameterName = 'return_path';
        var returnPath = $location.search()[returnPathParameterName];
        $location.search(returnPathParameterName, null);
        console.log('return_path ' + returnPath + 'parameter received');

        // go to returnPath
        $location.path(returnPath);
    }
})();
