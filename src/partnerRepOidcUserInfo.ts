import OidcUserInfo from './oidcUserInfo';

/**
 * OpenID Connect (OIDC) UserInfo for a partner rep
 */
export default class PartnerRepOidcUserInfo extends OidcUserInfo {

    private _sub:Number;
    private _partner_sap_account_number:string;
    private _sap_vendor_number:string;

    constructor(given_name:string,
                family_name:string,
                email:string,
                type:string,
                sub:Number,
                partner_sap_account_number:string = null,
                sap_vendor_number:string = null) {

        super(given_name, family_name, email, type);

        if (!sub) {
            throw 'sub required';
        }
        this._sub = sub;

        this._partner_sap_account_number = partner_sap_account_number;

        this._sap_vendor_number = sap_vendor_number;

    }

}