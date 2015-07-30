/**
 * OpenID Connect (OIDC) UserInfo
 * @typedef {Object} OidcUserInfo
 * @property {string} given_name
 * @property {string} family_name
 * @property {string} email
 * @property {string} type - either "partnerRep" or "employee"
 */

/**
 * OpenID Connect (OIDC) UserInfo for a partner rep
 * @typedef {Object} PartnerRepOidcUserInfo
 * @augments {OidcUserInfo}
 * @property {number} sub
 * @property {(string|null)} partner_sap_account_number
 * @property {(string|null)} sap_vendor_number
 */

/**
 * OpenID Connect (OIDC) UserInfo for an employee
 * @typedef {Object} EmployeeOidcUserInfo
 * @augments {OidcUserInfo}
 */