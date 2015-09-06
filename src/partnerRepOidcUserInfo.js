import OidcUserInfo from './oidcUserInfo';

/**
 * OpenID Connect (OIDC) UserInfo for a partner rep
 * @class {PartnerRepOidcUserInfo}
 */
export default class PartnerRepOidcUserInfo extends OidcUserInfo {

    _sub:string;

    _partner_sap_account_number:string;

    _sap_vendor_number:string;

    /**
     * @param {string} given_name
     * @param {string} family_name
     * @param {string} email
     * @param {string} sub
     * @param {string|null} [partner_sap_account_number]
     * @param {string|null} [sap_vendor_number]
     */
    constructor(given_name:string,
                family_name:string,
                email:string,
                sub:string,
                partner_sap_account_number:string = null,
                sap_vendor_number:string = null) {

        super(given_name, family_name, email);

        if (!sub) {
            throw new TypeError('sub required');
        }
        this._sub = sub;

        this._partner_sap_account_number = partner_sap_account_number;

        this._sap_vendor_number = sap_vendor_number;

    }

    /**
     * @returns {number}
     */
    get sub() {
        return this._sub;
    }

    /**
     * @returns {string}
     */
    get partner_sap_account_number() {
        return this._partner_sap_account_number;
    }

    /**
     * @returns {string}
     */
    get sap_vendor_number() {
        return this._sap_vendor_number;
    }

}
