System.register(['aurelia-dependency-injection', 'aurelia-http-client', './identityServiceSdkConfig'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
        switch (arguments.length) {
            case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
            case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
            case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
        }
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var aurelia_dependency_injection_1, aurelia_http_client_1, identityServiceSdkConfig_1;
    var RefreshAccessTokenUseCase;
    return {
        setters:[
            function (aurelia_dependency_injection_1_1) {
                aurelia_dependency_injection_1 = aurelia_dependency_injection_1_1;
            },
            function (aurelia_http_client_1_1) {
                aurelia_http_client_1 = aurelia_http_client_1_1;
            },
            function (identityServiceSdkConfig_1_1) {
                identityServiceSdkConfig_1 = identityServiceSdkConfig_1_1;
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
                 * @param {string} accessToken
                 * @returns {Promise<string>}
                 */
                RefreshAccessTokenUseCase.prototype.execute = function (accessToken) {
                    if (!accessToken) {
                        throw 'accessToken required';
                    }
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
                    aurelia_dependency_injection_1.autoinject, 
                    __metadata('design:paramtypes', [aurelia_http_client_1.HttpClient, identityServiceSdkConfig_1.IdentityServiceSdkConfig])
                ], RefreshAccessTokenUseCase);
                return RefreshAccessTokenUseCase;
            })();
            exports_1("default",RefreshAccessTokenUseCase);
        }
    }
});
