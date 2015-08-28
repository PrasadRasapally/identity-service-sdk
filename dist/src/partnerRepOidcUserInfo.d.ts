import OidcUserInfo from './oidcUserInfo';
/**
 * OpenID Connect (OIDC) UserInfo for a partner rep
 */
export default class PartnerRepOidcUserInfo extends OidcUserInfo {
    private _sub;
    private _partner_sap_account_number;
    private _sap_vendor_number;
    constructor(given_name: string, family_name: string, email: string, type: string, sub: number, partner_sap_account_number?: string, sap_vendor_number?: string);
}
