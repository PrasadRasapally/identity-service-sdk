import OidcUserInfo from './oidcUserInfo';

/**
 * OpenID Connect (OIDC) UserInfo for an employee
 * @module
 */
export default class EmployeeOidcUserInfo extends OidcUserInfo {


    constructor(given_name:String,
                family_name:String,
                email:String,
                type:String) {
        super(given_name, family_name, email, type);
    }
}