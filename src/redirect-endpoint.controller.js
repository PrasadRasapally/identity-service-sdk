(function () {

    angular
        .module("identityServiceModule")
        .controller(
        "IdentityServiceRedirectEndpointController",
        [
            "identityServiceClient",
            "$location",
            IdentityServiceRedirectEndpointController
        ]);

    function IdentityServiceRedirectEndpointController(identityServiceClient,
                                                       $location) {

        // get search parameters
        var searchParams = $location.search();

        // consume access token parameter
        var accessTokenParameterName = "access_token";
        var accessToken = searchParams[accessTokenParameterName];
        identityServiceClient.login(accessToken);
        searchParams[accessTokenParameterName] = null;

        // consume returnPath parameter
        var returnPathParameterName = "return_path";
        var returnPath = searchParams[returnPathParameterName];
        searchParams[returnPathParameterName]= null;

        // redirect to returnPath & replace current browser history record
        $location
            .path(returnPath)
            .search(searchParams)
            .replace();
    }
})();
