(function () {
    angular
        .module("identityServiceModule")
        .config([
            "$httpProvider",
            "http401ResponseInterceptor",
            config]);

    function config($httpProvider,
                    http401ResponseInterceptor) {

        $httpProvider.interceptors.push(http401ResponseInterceptor);

    }
})();