System.register(['./oidcUserInfo'], function(exports_1) {
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var oidcUserInfo_1;
    var EmployeeOidcUserInfo;
    return {
        setters:[
            function (oidcUserInfo_1_1) {
                oidcUserInfo_1 = oidcUserInfo_1_1;
            }],
        execute: function() {
            /**
             * OpenID Connect (OIDC) UserInfo for an employee
             * @module
             */
            EmployeeOidcUserInfo = (function (_super) {
                __extends(EmployeeOidcUserInfo, _super);
                function EmployeeOidcUserInfo(given_name, family_name, email, type) {
                    _super.call(this, given_name, family_name, email, type);
                }
                return EmployeeOidcUserInfo;
            })(oidcUserInfo_1.default);
            exports_1("default", EmployeeOidcUserInfo);
        }
    }
});
