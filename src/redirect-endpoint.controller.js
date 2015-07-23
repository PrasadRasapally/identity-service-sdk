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
        searchParams[accessTokenParameterName] = null;
        identityServiceClient.login(accessToken);

        // consume returnPath parameter
        var returnPathParameterName = "return_path";
        searchParams[returnPathParameterName]= null;
        var returnPath = searchParams[returnPathParameterName];

        // redirect to returnPath & replace current browser history record
        $location
            .path(returnPath)
            .search(searchParams)
            .replace();
    }
})();
