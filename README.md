## Description
An AngularJS Module implementing common use cases encountered when integrating AngularJS apps
 with the precorconnect identity service.

## UseCases
#####getSsoLoginUrl
Gets a URL for initiating a SSO login flow and persists the resulting access_token to browser storage.

#####getUserInfo
Uses the current access_token to obtain the current userinfo from the identity provider.

#####setAccessToken
Saves the provided access_token to browser storage so it may be used in proceeding API calls. 

#####getAccessToken
Retrieves the current access_token from browser storage. Primarily used to build an Authorization header to make an API call to a protected resource. 

## Installation
add as bower dependency  
    
```shell
bower install https://bitbucket.org/precorconnect/identity-service-angularjs-sdk.git --save
```  
include in view  
```html
<script src="bower-components/angular/angular.js"></script>
<script src="bower-components/angular-route/angular-route.js"></script>
<script src="bower-components/angular-local-storage/dist/angular-local-storage.min.js"></script>
<script src="bower-components/identity-service-angularjs-sdk/dist/identity-service-angularjs-sdk.js"></script>
```  
configure  
see below.

## Configuration 
####Properties
| Name (* denotes required) | Description |
|------|-------------|
| baseUrl* | The base url of the identity service. |
| samlIdpUrl* | The url of the SAML 2.0 identity providers SSO page. |

#### Example
```js
angular.module(
        "app",
        ["identityServiceModule"])
        .config(
        [
            "identityServiceConfigProvider",
            appConfig
        ]);

    function appConfig(identityServiceConfigProvider) {
        identityServiceConfigProvider
            .setBaseUrl("@@identityServiceBaseUrl")
            .setSamlIdpUrl("@@samlIdpUrl");
    }
```