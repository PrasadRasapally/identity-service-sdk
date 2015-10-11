Feature: Refresh accessToken
  Refreshes the provided access token

  Scenario: Success
    Given I provide a jwt considered valid by the identity-service
    When I executeRefreshAccessToken
    Then an accessToken is returned