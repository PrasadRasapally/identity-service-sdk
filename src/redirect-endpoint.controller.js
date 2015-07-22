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
        // note: at time of writing this but is still open: https://github.com/angular/angular.js/issues/12168
        $location
            .path(returnPath)
            .search(accessTokenParameterName, null)
            .search(returnPathParameterName, null)
            .replace();
    }
})();
