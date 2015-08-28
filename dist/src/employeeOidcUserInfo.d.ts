import OidcUserInfo from './oidcUserInfo';
/**
 * OpenID Connect (OIDC) UserInfo for an employee
 * @module
 */
export default class EmployeeOidcUserInfo extends OidcUserInfo {
    constructor(given_name: string, family_name: string, email: string, type: string);
}
