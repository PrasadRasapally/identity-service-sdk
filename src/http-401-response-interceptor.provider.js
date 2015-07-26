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
                "identityServiceConfigProvider",
                "$location",
                "$window",
                $get]
        };

        function $get($q,
                      identityServiceConfigProvider,
                      $location,
                      $window) {
            return {
                response: function (response) {
                    if (response.status === 401) {
                        console.log("Response 401");
                    }
                    return response || $q.when(response);
                },
                responseError: function (rejection) {
                    if (rejection.status === 401) {
                        console.log("Response Error 401", rejection);
                        $window.location = identityServiceConfigProvider.getSsoLoginUrl($location.path());
                    }
                    return $q.reject(rejection);
                }
            }
        }

    }
})
();
