(function () {
    angular
        .module("identityServiceModule")
        .provider(
        'identityServiceConfig',
        identityServiceConfigProvider
    );

    function identityServiceConfigProvider() {

        var objectUnderConstruction = {
            setBaseUrl: setBaseUrl,
            setIdentityServiceBaseUrl: setIdentityServiceBaseUrl,
            setSamlIdpUrl: setSamlIdpUrl,
            $get: $get
        };

        return objectUnderConstruction;

        function setBaseUrl(baseUrl) {
            objectUnderConstruction.baseUrl = baseUrl;
            return objectUnderConstruction;
        }

        function setIdentityServiceBaseUrl(identityServiceBaseUrl) {
            objectUnderConstruction.identityServiceBaseUrl = identityServiceBaseUrl;
            return objectUnderConstruction;
        }

        function setSamlIdpUrl(samlIdpUrl) {
            objectUnderConstruction.samlIdpUrl = samlIdpUrl;
            return objectUnderConstruction;
        }

        function $get(){
            return {
                baseUrl:objectUnderConstruction.baseUrl,
                identityServiceBaseUrl:objectUnderConstruction.identityServiceBaseUrl,
                samlIdpUrl:objectUnderConstruction.samlIdpUrl
            }
        }
    }
})();