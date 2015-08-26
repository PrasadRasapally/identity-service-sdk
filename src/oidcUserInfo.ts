/**
 * OpenID Connect (OIDC) UserInfo
 */
export default class OidcUserInfo {

    private _given_name:String;
    private _family_name:String;
    private _email:String;
    private _type:String;

    constructor(given_name:String,
                family_name:String,
                email:String,
                type:String) {

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

    get given_name():String {
        return this._given_name;
    }

    get family_name():String {
        return this._family_name;
    }

    get email():String {
        return this._email;
    }

    get type():String {
        return this._type;
    }
}
