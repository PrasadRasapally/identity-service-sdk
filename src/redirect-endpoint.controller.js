(function () {

    angular
        .module('identityServiceModule')
        .controller(
        'IdentityServiceRedirectEndpointController',
        [
            'identityServiceClient',
            '$location',
            IdentityServiceRedirectEndpointController
        ]);

    function IdentityServiceRedirectEndpointController(identityServiceClient,
                                                       $location) {

        // consume access token parameter
        var accessTokenParameterName = 'access_token';
        var accessToken = $location.search()[accessTokenParameterName];
        identityServiceClient.setAccessToken(accessToken);
        console.log('access_token with signature ' + accessToken.split('.')[2] + ' processed');

        // consume returnPath parameter
        var returnPathParameterName = 'return_path';
        var returnPath = $location.search()[returnPathParameterName];
        console.log('return_path ' + returnPath + ' processed');

        // redirect to returnPath & replace current browser history record
        $location.path(returnPath).search({}).replace();
    }
})();
