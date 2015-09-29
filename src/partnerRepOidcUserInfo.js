import OidcUserInfo from './oidcUserInfo';

/**
 * OpenID Connect (OIDC) UserInfo for a partner rep
 * @class {PartnerRepOidcUserInfo}
 */
export default class PartnerRepOidcUserInfo extends OidcUserInfo {

    _sub:string;

    _account_id:string;

    _sap_vendor_number:string;

    /**
     * @param {string} given_name
     * @param {string} family_name
     * @param {string} email
     * @param {string} sub
     * @param {string} [account_id]
     * @param {string|null} [sap_vendor_number]
     */
    constructor(given_name:string,
                family_name:string,
                email:string,
                sub:string,
                account_id:string,
                sap_vendor_number:string = null) {

        super(given_name, family_name, email);

        if (!sub) {
            throw new TypeError('sub required');
        }
        this._sub = sub;

        if (!account_id) {
            throw new TypeError('account_id required');
        }
        this._account_id = account_id;

        this._sap_vendor_number = sap_vendor_number;

    }

    /**
     * @returns {string}
     */
    get sub() {
        return this._sub;
    }

    /**
     * @returns {string}
     */
    get account_id() {
        return this._account_id;
    }

    /**
     * @returns {string}
     */
    get sap_vendor_number() {
        return this._sap_vendor_number;
    }

}
