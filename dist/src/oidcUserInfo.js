System.register([], function(exports_1) {
    var OidcUserInfo;
    return {
        setters:[],
        execute: function() {
            /**
             * OpenID Connect (OIDC) UserInfo
             */
            OidcUserInfo = (function () {
                function OidcUserInfo(given_name, family_name, email, type) {
                    if (!given_name) {
                        throw 'given_name required';
                    }
                    this._given_name = given_name;
                    if (!family_name) {
                        throw 'family_name required';
                    }
                    this._family_name = family_name;
                    if (!email) {
                        throw 'email required';
                    }
                    this._email = email;
                    if (!type) {
                        throw 'type required';
                    }
                    this._type = type;
                }
                Object.defineProperty(OidcUserInfo.prototype, "given_name", {
                    get: function () {
                        return this._given_name;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(OidcUserInfo.prototype, "family_name", {
                    get: function () {
                        return this._family_name;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(OidcUserInfo.prototype, "email", {
                    get: function () {
                        return this._email;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(OidcUserInfo.prototype, "type", {
                    get: function () {
                        return this._type;
                    },
                    enumerable: true,
                    configurable: true
                });
                return OidcUserInfo;
            })();
            exports_1("default", OidcUserInfo);
        }
    }
});
