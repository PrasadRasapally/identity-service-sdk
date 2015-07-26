## Description
An AngularJS Module implementing common use cases encountered when integrating AngularJS apps
 with the precorconnect identity service.

## Use Cases
#####Get Access Token
Retrieves the current access_token from browser storage. Primarily used to build an 
Authorization header to make an API call to a protected resource.   

#####Get User Info
Gets userInfo for the current user. If no userInfo is retrievable, executes [Login With SAML](#login-with-saml)

#####Login With SAML
Logs a user in by:  
1.  initiates a SAML 2.0 SP initiated Redirect POST login flow  
2.  sets the resulting access token in browser storage such that it will be returned 
by [Get Access Token](#get-access-token)

#####Logout  
Logs out the currently logged in user by:  
1.  removing their accessToken from localStorage  
2.  redirecting them to the configured logoutUrl

## Installation  

**install required dependencies:**  
-  [angular](https://angularjs.org/)  
-  [angular-route](https://github.com/angular/bower-angular-route)  
-  [angular-local-storage](https://github.com/grevory/angular-local-storage)

**add bower dependency**  

```shell
bower install https://bitbucket.org/precorconnect/identity-service-angularjs-sdk.git --save
```  

**include in view**  
```html
<script src="bower_components/identity-service-angularjs-sdk/dist/identity-service-angularjs-sdk.js"></script>
```  

**add to angular dependencies**
```js
angular.module(
        "app",
        ["identityServiceSdk.module"]);
```
configure  
see below.

## Configuration 
####Properties
| Name (* denotes required) | Description |
|------|-------------|
| baseUrl* | The base url of the identity service. |
| samlLoginUrl* | The url of the SAML 2.0 identity providers SSO page. |
| logoutUrl* | The url to redirect to upon logout. |

#### Example
```js
angular.module(
        "app",
        ["identityServiceModule"])
        .config(
        [
            "identityServiceSdk.configProvider",
            appConfig
        ]);

    function appConfig(identityServiceSdk_configProvider) {
        identityServiceSdk_configProvider
            .setBaseUrl("@@identityServiceBaseUrl")
            .setSamlLoginUrl("@@samlLoginUrl")
            .setLogoutUrl("@@logoutUrl");
    }
```