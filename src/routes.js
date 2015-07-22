(function () {
    angular.module(
        "identityServiceModule")
        .config(
        [
            "$routeProvider",
            function ($routeProvider) {
                $routeProvider
                    .when
                (
                    "/identity-service/redirect-endpoint",
                    {
                        template: " ",
                        controller: "IdentityServiceRedirectEndpointController",
                        controllerAs:"controller"
                    }
                )
            }
        ]);
})();