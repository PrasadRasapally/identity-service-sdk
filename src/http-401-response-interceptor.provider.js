(function () {
    angular
        .module("identityServiceModule")
        .factory(
        "http401ResponseInterceptor",
        http401ResponseInterceptorProvider);

    function http401ResponseInterceptorProvider() {

        var http401ResponseInterceptor = {
            $get: [
                "$q",
                "identityServiceClient",
                "$location",
                "$window",
                $get]
        };

        return http401ResponseInterceptor;

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
