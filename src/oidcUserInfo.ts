/**
 * OpenID Connect (OIDC) UserInfo
 */
export default class OidcUserInfo {

    private _given_name:string;
    private _family_name:string;
    private _email:string;
    private _type:string;

    constructor(given_name:string,
                family_name:string,
                email:string,
                type:string) {

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

    get given_name():string {
        return this._given_name;
    }

    get family_name():string {
        return this._family_name;
    }

    get email():string {
        return this._email;
    }

    get type():string {
        return this._type;
    }
}
