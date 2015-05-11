(function () {
    angular
        .module("identityServiceModule")
        .provider(
        'identityServiceConfig',
        identityServiceConfigProvider
    );

    function identityServiceConfigProvider() {

        var thisProvider = {
            setBaseUrl: setBaseUrl,
            setIdentityServiceBaseUrl: setIdentityServiceBaseUrl,
            setSamlIdpUrl: setSamlIdpUrl,
            $get: $get
        };

        return thisProvider;

        function setBaseUrl(baseUrl) {
            thisProvider.baseUrl = baseUrl;
            return thisProvider;
        }

        function setIdentityServiceBaseUrl(identityServiceBaseUrl) {
            thisProvider.identityServiceBaseUrl = identityServiceBaseUrl;
            return thisProvider;
        }

        function setSamlIdpUrl(samlIdpUrl) {
            thisProvider.samlIdpUrl = samlIdpUrl;
            return thisProvider;
        }

        function $get(){
            return {
                baseUrl:thisProvider.baseUrl,
                identityServiceBaseUrl:thisProvider.identityServiceBaseUrl,
                samlIdpUrl:thisProvider.samlIdpUrl
            }
        }
    }
})();