(function () {
    angular
        .module("identityServiceSdk.module")
        .provider("identityServiceSdk.config",
        configProvider
    );

    function configProvider() {

        var objectUnderConstruction = {
            setBaseUrl: setBaseUrl,
            setSamlLoginUrl: setSamlLoginUrl,
            setLogoutUrl: setLogoutUrl,
            $get: $get
        };

        return objectUnderConstruction;

        function setBaseUrl(baseUrl) {
            objectUnderConstruction.baseUrl = baseUrl;
            return objectUnderConstruction;
        }

        function setSamlLoginUrl(samlLoginUrl) {
            objectUnderConstruction.samlLoginUrl = samlLoginUrl;
            return objectUnderConstruction;
        }

        function setLogoutUrl(logoutUrl) {
            objectUnderConstruction.logoutUrl = logoutUrl;
            return objectUnderConstruction;
        }

        function $get() {
            return {
                baseUrl: objectUnderConstruction.baseUrl,
                samlLoginUrl: objectUnderConstruction.samlLoginUrl,
                logoutUrl: objectUnderConstruction.logoutUrl
            };

        }
    }
})();