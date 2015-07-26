(function () {
    angular
        .module("identityServiceModule")
        .factory(
        "http401ResponseInterceptor",
        [
            "$q",
            "identityServiceClient",
            "$location",
            "$window",
            http401ResponseInterceptor
        ]);
    function http401ResponseInterceptor($q,
                                        identityServiceClient,
                                        $location,
                                        $window) {
        return {
            responseError: function (rejection) {
                if (rejection.status === 401) {
                    $window.location = identityServiceClient.getSsoLoginUrl($location.path());
                }
                return $q.reject(rejection);
            }
        }

    }
})();
