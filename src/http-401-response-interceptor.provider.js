(function () {
    angular
        .module("identityServiceModule")
        .provider(
        "http401ResponseInterceptor",
        http401ResponseInterceptorProvider);

    function http401ResponseInterceptorProvider() {

        return {
            $get: [
                "$q",
                "identityServiceClient",
                "$location",
                "$window",
                $get]
        };

        function $get($q,
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

    }
})
();
