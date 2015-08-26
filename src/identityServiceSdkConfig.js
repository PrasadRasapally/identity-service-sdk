System.register([], function(exports_1) {
    var IdentityServiceSdkConfig;
    return {
        setters:[],
        execute: function() {
            /**
             * @class IdentityServiceSdkConfig
             * @constructor
             */
            IdentityServiceSdkConfig = (function () {
                function IdentityServiceSdkConfig(baseUrl) {
                    if (!baseUrl) {
                        throw 'baseUrl required';
                    }
                    this._baseUrl = baseUrl;
                }
                Object.defineProperty(IdentityServiceSdkConfig.prototype, "baseUrl", {
                    get: function () {
                        return this._baseUrl;
                    },
                    enumerable: true,
                    configurable: true
                });
                return IdentityServiceSdkConfig;
            })();
            exports_1("default", IdentityServiceSdkConfig);
        }
    }
});
//# sourceMappingURL=identityServiceSdkConfig.js.map