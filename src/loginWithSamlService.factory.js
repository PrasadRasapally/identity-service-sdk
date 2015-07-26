(function () {
    angular
        .module("identityServiceSdk.module")
        .factory(
        "identityServiceSdk.loginWithSamlService",
        [
            "identityServiceSdk.loginUrlFactory",
            "$location",
            "$window",
            loginWithSamlService
        ]
    );

    function loginWithSamlService(loginUrlFactory,
                          $location,
                          $window) {

        return {
            execute: execute
        };


        function execute() {

            $window.location = loginUrlFactory.construct($location.path());

        }

    }

})();