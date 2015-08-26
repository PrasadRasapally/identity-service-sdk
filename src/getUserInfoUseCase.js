var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};System.register(['aurelia-dependency-injection'], function(exports_1) {
    var aurelia_dependency_injection_1;
    var GetUserInfoUseCase;
    return {
        setters:[
            function (_aurelia_dependency_injection_1) {
                aurelia_dependency_injection_1 = _aurelia_dependency_injection_1;
            }],
        execute: function() {
            /**
             * @class GetUserInfoUseCase
             * @constructor
             */
            GetUserInfoUseCase = (function () {
                function GetUserInfoUseCase(httpClient, config) {
                    if (!httpClient) {
                        throw 'httpClient required';
                    }
                    this._httpClient = httpClient;
                    if (!config) {
                        throw 'config required';
                    }
                    this._config = config;
                }
                /**
                 * Gets userInfo via the provided access token.
                 * @param {String} accessToken
                 * @returns a promise of {OidcUserInfo}
                 */
                GetUserInfoUseCase.prototype.execute = function (accessToken) {
                    return this._httpClient
                        .createRequest('oauth2/userinfo')
                        .asGet()
                        .withBaseUrl(this._config.baseUrl)
                        .withHeader('Authorization', "Bearer " + accessToken)
                        .send()
                        .then(function (response) { return (response.content); });
                };
                GetUserInfoUseCase = __decorate([
                    aurelia_dependency_injection_1.autoinject
                ], GetUserInfoUseCase);
                return GetUserInfoUseCase;
            })();
            exports_1("default",GetUserInfoUseCase);
        }
    }
});
//# sourceMappingURL=getUserInfoUseCase.js.map