(function () {
    angular
        .module("identityServiceSdk.module")
        .service("identityServiceLoginUrlFactory",
        [
            "$window",
            "identityServiceSdk.config",
            loginUrlFactory
        ]);

    function loginUrlFactory($window,
                             config) {

        return {
            construct: construct
        };

        /**
         * Constructs a URL for initiating a SSO login flow and persisting the
         * resulting access_token to browser storage.
         * @param {string} returnPath - The angular path to route to following successful login
         */
        function construct(returnPath) {

            // the url to return to after successfully logging in.
            var relayState = $window.location.protocol
                + "//"
                + $window.location.host
                + $window.location.pathname
                + "#/identity-service/redirect-endpoint?access_token={access_token}&return_path="
                + returnPath;

            // determine appropriate prefix for relay state parameter
            var relayStatePrefix = "&";
            if (1 > config.samlLoginUrl.indexOf("?")) {
                relayStatePrefix = "?";
            }

            return config.samlLoginUrl
                + relayStatePrefix
                + "RelayState="
                + encodeURIComponent(relayState);
        }
    }
})();