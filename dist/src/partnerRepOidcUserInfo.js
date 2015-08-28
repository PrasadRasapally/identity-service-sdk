System.register(['./oidcUserInfo'], function(exports_1) {
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var oidcUserInfo_1;
    var PartnerRepOidcUserInfo;
    return {
        setters:[
            function (oidcUserInfo_1_1) {
                oidcUserInfo_1 = oidcUserInfo_1_1;
            }],
        execute: function() {
            /**
             * OpenID Connect (OIDC) UserInfo for a partner rep
             */
            PartnerRepOidcUserInfo = (function (_super) {
                __extends(PartnerRepOidcUserInfo, _super);
                function PartnerRepOidcUserInfo(given_name, family_name, email, type, sub, partner_sap_account_number, sap_vendor_number) {
                    if (partner_sap_account_number === void 0) { partner_sap_account_number = null; }
                    if (sap_vendor_number === void 0) { sap_vendor_number = null; }
                    _super.call(this, given_name, family_name, email, type);
                    if (!sub) {
                        throw 'sub required';
                    }
                    this._sub = sub;
                    this._partner_sap_account_number = partner_sap_account_number;
                    this._sap_vendor_number = sap_vendor_number;
                }
                return PartnerRepOidcUserInfo;
            })(oidcUserInfo_1.default);
            exports_1("default", PartnerRepOidcUserInfo);
        }
    }
});
