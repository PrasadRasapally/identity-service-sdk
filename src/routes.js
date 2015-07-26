(function () {
    angular
        .module("identityServiceSdk.module")
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
                        controller: "identityServiceSdk.RedirectEndpointController",
                        controllerAs: "controller"
                    }
                )
            }
        ]);
})();