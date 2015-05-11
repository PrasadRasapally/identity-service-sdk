## Description
An AngularJS Module implementing common use cases encountered when integrating AngularJS apps
 with the precorconnect identity service.

## UseCases
#####initiateLogin
Initiates a SSO login flow and persists the resultant access_token to browser storage.

#####getUserInfo
Uses the current access_token to obtain the current userinfo from the identity provider.

#####getAccessToken
Retrieves the current access_token from browser storage ready for use in API calls. 

## Configuration 
####Properties
| Name (* denotes required) | Description |
|------|-------------|
| baseUrl* | The base url of the current webapp. |
| identityServiceBaseUrl* | The base url of the identity service. |
| samlIdpUrl* | The url of the SAML 2.0 identity providers SSO page. |

#### Example
```javascript
angular.module(
        "app",
        [""])
        .config(
        [
            "identityServiceConfigProvider",
            appConfig
        ]);

    function appConfig(identityServiceConfigProvider) {
        identityServiceConfigProvider
            .setBaseUrl("@@baseUrl")
            .setIdentityServiceBaseUrl("@@identityServiceBaseUrl")
            .setSamlIdpUrl("@@samlIdpUrl");
    }
```

