Feature: Get User Info
  Gets userInfo via the provided access token.

  Background:
    Given partnerRepOidcUserInfo consists of:
      | attribute       | validation              | type   |
      | givenName       | required                | string |
      | familyName      | required                | string |
      | email           | required                | string |
      | sub             | required                | string |
      | accountId       | required                | string |
      | sapVendorNumber | optional                | string |
      | type            | must equal "partnerRep" | string |
    And employeeOidcUserInfo consists of:
      | attribute  | validation            | type   |
      | givenName  | required              | string |
      | familyName | required              | string |
      | email      | required              | string |
      | type       | must equal "employee" | string |

  Scenario Template: Success
    Given I provide a <accessToken type> considered valid by the identity-service
    When I execute getUserInfo
    Then a <oidcUserInfo type> is returned
    Examples:
      | accessToken type      | oidcUserInfo type      |
      | partnerRepAccessToken | partnerRepOidcUserInfo |
      | employeeAccessToken   | employeeOidcUserInfo |