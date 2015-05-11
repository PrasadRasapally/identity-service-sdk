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
| baseUrl* | The base url of the current webapp. |
| identityServiceBaseUrl* | The base url of the identity service. |
| samlIdpUrl* | The url of the SAML 2.0 identity providers SSO page. |

#### Example
```js
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

