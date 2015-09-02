/**
 * OpenID Connect (OIDC) UserInfo
 * @class {OidcUserInfo}
 */
export default class OidcUserInfo {

    _given_name:string;
    _family_name:string;
    _email:string;
    _type:string;

    /**
     * @param {string} given_name
     * @param {string} family_name
     * @param {string} email
     * @param {string} type
     */
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

    /**
     * @returns {string}
     */
    get given_name():string {
        return this._given_name;
    }

    /**
     * @returns {string}
     */
    get family_name():string {
        return this._family_name;
    }

    /**
     * @returns {string}
     */
    get email():string {
        return this._email;
    }

    /**
     * @returns {string}
     */
    get type():string {
        return this._type;
    }
}
