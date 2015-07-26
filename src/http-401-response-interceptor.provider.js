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
            http401ResponseInterceptorProvider
        ]);
    function http401ResponseInterceptorProvider($q,
                                                identityServiceClient,
                                                $location,
                                                $window) {

        var http401ResponseInterceptor = {
            $get: $get
        };

        return http401ResponseInterceptor;

        function $get() {
            return {
                responseError: function (rejection) {
                    if (rejection.status === 401) {
                        $window.location = identityServiceClient.getSsoLoginUrl($location.path());
                    }
                    return $q.reject(rejection);
                }
            }
        }

    }
})
();
