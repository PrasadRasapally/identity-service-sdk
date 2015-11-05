/**
 * OpenID Connect (OIDC) UserInfo
 * @class {OidcUserInfo}
 */
export default class OidcUserInfo {

    _given_name:string;
    _family_name:string;

    /**
     * @param {string} given_name
     * @param {string} family_name
     * @param {string} sub
     */
    constructor(given_name:string,
                family_name:string,
                sub:string) {

        if (!given_name) {
            throw new TypeError('given_name required');
        }
        this._given_name = given_name;

        if (!family_name) {
            throw new TypeError('family_name required');
        }
        this._family_name = family_name;

        if (!sub) {
            throw new TypeError('sub required');
        }
        this._sub = sub;

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
    get sub():string {
        return this._sub;
    }

}
