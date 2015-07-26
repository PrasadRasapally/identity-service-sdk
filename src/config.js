(function () {
    angular
        .module("identityServiceModule")
        .config([
            "$httpProvider",
            "http401ResponseInterceptorProvider",
            config]);

    function config($httpProvider,
                    http401ResponseInterceptorProvider) {

        $httpProvider.interceptors.push(http401ResponseInterceptorProvider.$get);

    }
})();