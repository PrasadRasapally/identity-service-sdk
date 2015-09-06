import OidcUserInfo from './oidcUserInfo';

/**
 * OpenID Connect (OIDC) UserInfo for an employee
 * @class {EmployeeOidcUserInfo}
 */
export default class EmployeeOidcUserInfo extends OidcUserInfo {

    /**
     * @param {string} given_name
     * @param {string} family_name
     * @param {string} email
     */
    constructor(given_name:string,
                family_name:string,
                email:string) {

        super(given_name, family_name, email);

    }
}