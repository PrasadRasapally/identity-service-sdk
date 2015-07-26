(function () {
    angular
        .module("identityServiceModule")
        .provider(
        "identityServiceConfig",
        identityServiceConfigProvider
    );

    function identityServiceConfigProvider() {

        var objectUnderConstruction = {
            setBaseUrl: setBaseUrl,
            setSamlIdpUrl: setSamlIdpUrl,
            setLogoutUrl: setLogoutUrl,
            $get: $get
        };

        return objectUnderConstruction;

        function setBaseUrl(baseUrl) {
            objectUnderConstruction.baseUrl = baseUrl;
            return objectUnderConstruction;
        }

        function setSamlIdpUrl(samlIdpUrl) {
            objectUnderConstruction.samlIdpUrl = samlIdpUrl;
            return objectUnderConstruction;
        }

        function setLogoutUrl(logoutUrl) {
            objectUnderConstruction.logoutUrl = logoutUrl;
            return objectUnderConstruction;
        }

        function $get() {
            return {
                baseUrl: objectUnderConstruction.baseUrl,
                samlIdpUrl: objectUnderConstruction.samlIdpUrl,
                logoutUrl: objectUnderConstruction.logoutUrl
            };

        }
    }
})();