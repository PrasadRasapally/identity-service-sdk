System.register(['aurelia-dependency-injection', './identityServiceSdkConfig', 'aurelia-http-client', './getUserInfoUseCase', './refreshAccessTokenUseCase'], function(exports_1) {
    var aurelia_dependency_injection_1, identityServiceSdkConfig_1, aurelia_http_client_1, getUserInfoUseCase_1, refreshAccessTokenUseCase_1;
    var DiContainerFactory;
    return {
        setters:[
            function (aurelia_dependency_injection_1_1) {
                aurelia_dependency_injection_1 = aurelia_dependency_injection_1_1;
            },
            function (identityServiceSdkConfig_1_1) {
                identityServiceSdkConfig_1 = identityServiceSdkConfig_1_1;
            },
            function (aurelia_http_client_1_1) {
                aurelia_http_client_1 = aurelia_http_client_1_1;
            },
            function (getUserInfoUseCase_1_1) {
                getUserInfoUseCase_1 = getUserInfoUseCase_1_1;
            },
            function (refreshAccessTokenUseCase_1_1) {
                refreshAccessTokenUseCase_1 = refreshAccessTokenUseCase_1_1;
            }],
        execute: function() {
            /**
             * @class DiContainerFactory
             * @constructor
             */
            DiContainerFactory = (function () {
                function DiContainerFactory(config) {
                    if (!config) {
                        throw 'config required';
                    }
                    this._config = config;
                }
                /**
                 *
                 * @returns {Container} dependency injection container
                 */
                DiContainerFactory.prototype.construct = function () {
                    var container = new aurelia_dependency_injection_1.Container();
                    container.registerInstance(identityServiceSdkConfig_1.IdentityServiceSdkConfig, this._config);
                    container.autoRegister(aurelia_http_client_1.HttpClient);
                    DiContainerFactory._registerUseCases(container);
                    return container;
                };
                DiContainerFactory._registerUseCases = function (container) {
                    container.autoRegister(getUserInfoUseCase_1.default);
                    container.autoRegister(refreshAccessTokenUseCase_1.default);
                };
                return DiContainerFactory;
            })();
            exports_1("default", DiContainerFactory);
        }
    }
});
