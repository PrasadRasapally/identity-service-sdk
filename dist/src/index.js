System.register(['./identityServiceSdkConfig', './identityServiceSdk'], function(exports_1) {
    return {
        setters:[
            function (identityServiceSdkConfig_1_1) {
                exports_1({
                    "IdentityServiceSdkConfig": identityServiceSdkConfig_1_1["IdentityServiceSdkConfig"]
                });
            },
            function (identityServiceSdk_1_1) {
                exports_1({
                    "default": identityServiceSdk_1_1["IdentityServiceSdk"]
                });
            }],
        execute: function() {
        }
    }
});
