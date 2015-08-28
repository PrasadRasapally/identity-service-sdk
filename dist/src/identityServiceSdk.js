System.register(['./diContainerFactory', './getUserInfoUseCase', './refreshAccessTokenUseCase'], function(exports_1) {
    var diContainerFactory_1, getUserInfoUseCase_1, refreshAccessTokenUseCase_1;
    var IdentityServiceSdk;
    return {
        setters:[
            function (diContainerFactory_1_1) {
                diContainerFactory_1 = diContainerFactory_1_1;
            },
            function (getUserInfoUseCase_1_1) {
                getUserInfoUseCase_1 = getUserInfoUseCase_1_1;
            },
            function (refreshAccessTokenUseCase_1_1) {
                refreshAccessTokenUseCase_1 = refreshAccessTokenUseCase_1_1;
            }],
        execute: function() {
            /**
             * @class IdentityServiceSdk
             * @constructor
             */
            IdentityServiceSdk = (function () {
                /**
                 *
                 * @param {IdentityServiceSdkConfig} config
                 */
                function IdentityServiceSdk(config) {
                    this._diContainer = new diContainerFactory_1.default(config).construct();
                }
                IdentityServiceSdk.prototype.getUserInfo = function (accessToken) {
                    return this
                        ._diContainer
                        .get(getUserInfoUseCase_1.default)
                        .execute(accessToken);
                };
                IdentityServiceSdk.prototype.refreshAccessToken = function (accessToken) {
                    return this
                        ._diContainer
                        .get(refreshAccessTokenUseCase_1.default)
                        .execute(accessToken);
                };
                return IdentityServiceSdk;
            })();
            exports_1("IdentityServiceSdk", IdentityServiceSdk);
        }
    }
});
