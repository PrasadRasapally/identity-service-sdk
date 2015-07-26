(function () {

    angular
        .module("identityServiceSdk.module")
        .controller(
        "identityServiceSdk.RedirectEndpointController",
        [
            "identityServiceClient",
            "$location",
            RedirectEndpointController
        ]);

    function RedirectEndpointController(identityServiceClient,
                                        $location) {

        // get search parameters
        var searchParams = $location.search();

        // replace current browser history record
        $location.replace();

        // consume access token parameter
        var accessTokenParameterName = "access_token";
        var accessToken = searchParams[accessTokenParameterName];
        identityServiceClient.setCurrentAccessToken(accessToken);
        searchParams[accessTokenParameterName] = null;

        // consume returnPath parameter
        var returnPathParameterName = "return_path";
        var returnPath = searchParams[returnPathParameterName];
        searchParams[returnPathParameterName] = null;

        // redirect to returnPath & replace current browser history record
        $location.search(searchParams);
        $location.path(returnPath);

    }
})();
