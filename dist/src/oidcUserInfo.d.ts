/**
 * OpenID Connect (OIDC) UserInfo
 */
export default class OidcUserInfo {
    private _given_name;
    private _family_name;
    private _email;
    private _type;
    constructor(given_name: string, family_name: string, email: string, type: string);
    given_name: string;
    family_name: string;
    email: string;
    type: string;
}
