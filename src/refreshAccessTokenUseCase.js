var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};System.register(['aurelia-dependency-injection'], function(exports_1) {
    var aurelia_dependency_injection_1;
    var RefreshAccessTokenUseCase;
    return {
        setters:[
            function (_aurelia_dependency_injection_1) {
                aurelia_dependency_injection_1 = _aurelia_dependency_injection_1;
            }],
        execute: function() {
            /**
             * @class RefreshAccessTokenUseCase
             * @constructor
             */
            RefreshAccessTokenUseCase = (function () {
                function RefreshAccessTokenUseCase(httpClient, config) {
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
                 * Refreshes the provided access token. Primarily used to refresh an access token for the
                 * purposes of maintaining an active session without redirecting the client browser to re-authenticate.
                 * @param {String} accessToken
                 * @returns a promise of {String}
                 */
                RefreshAccessTokenUseCase.prototype.execute = function (accessToken) {
                    return this._httpClient
                        .createRequest('oauth2/token')
                        .asPost()
                        .withBaseUrl(this._config.baseUrl)
                        .withHeader('Content-Type', 'application/x-www-form-urlencoded')
                        .withParams({
                        grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
                        assertion: accessToken
                    })
                        .send()
                        .then(function (response) { return (response.content.access_token); });
                };
                RefreshAccessTokenUseCase = __decorate([
                    aurelia_dependency_injection_1.autoinject
                ], RefreshAccessTokenUseCase);
                return RefreshAccessTokenUseCase;
            })();
            exports_1("default",RefreshAccessTokenUseCase);
        }
    }
});
//# sourceMappingURL=refreshAccessTokenUseCase.js.map