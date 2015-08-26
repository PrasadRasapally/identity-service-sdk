var aurelia_dependency_injection_1 = require('aurelia-dependency-injection');
var identityServiceSdkConfig_1 = require('./identityServiceSdkConfig');
var aurelia_http_client_1 = require('aurelia-http-client');
var getUserInfoUseCase_1 = require('./getUserInfoUseCase');
var refreshAccessTokenUseCase_1 = require('./refreshAccessTokenUseCase');
/**
 * @class DiContainerFactory
 * @constructor
 */
var DiContainerFactory = (function () {
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
        container.registerInstance(identityServiceSdkConfig_1["default"], this._config);
        container.autoRegister(aurelia_http_client_1.HttpClient);
        DiContainerFactory._registerUseCases(container);
        return container;
    };
    DiContainerFactory._registerUseCases = function (container) {
        container.autoRegister(getUserInfoUseCase_1["default"]);
        container.autoRegister(refreshAccessTokenUseCase_1["default"]);
    };
    return DiContainerFactory;
})();
exports["default"] = DiContainerFactory;
//# sourceMappingURL=diContainerFactory.js.map