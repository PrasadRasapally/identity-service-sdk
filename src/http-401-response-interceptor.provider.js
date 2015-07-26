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
                "ssoLoginUrlFactory",
                "$location",
                "$window",
                $get]
        };

        function $get($q,
                      ssoLoginUrlFactory,
                      $location,
                      $window) {
            return {
                responseError: function (rejection) {
                    if (rejection.status === 401) {
                        $window.location = ssoLoginUrlFactory.construct($location.path());
                    }
                    return $q.reject(rejection);
                }
            }
        }

    }
})
();
