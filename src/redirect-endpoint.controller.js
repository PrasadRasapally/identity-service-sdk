(function () {

    angular
        .module("identityServiceModule")
        .controller(
        "IdentityServiceRedirectEndpointController",
        [
            "identityServiceClient",
            "$location",
            "$log",
            IdentityServiceRedirectEndpointController
        ]);

    function IdentityServiceRedirectEndpointController(identityServiceClient,
                                                       $location,
                                                       $log) {

        // consume access token parameter
        var accessTokenParameterName = "access_token";
        var accessToken = $location.search()[accessTokenParameterName];
        identityServiceClient.setAccessToken(accessToken);
        $log.debug("access_token with signature " + accessToken.split(".")[2] + " processed");

        // consume returnPath parameter
        var returnPathParameterName = "return_path";
        var returnPath = $location.search()[returnPathParameterName];
        $log.debug("return_path " + returnPath + " processed");

        // redirect to returnPath & replace current browser history record
        // note: at time of writing this but is still open: https://github.com/angular/angular.js/issues/12168
        $location
            .path(returnPath)
            .search(accessTokenParameterName, null)
            .search(returnPathParameterName, null)
            .replace();
    }
})();
