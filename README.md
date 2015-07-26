## Description
An AngularJS Module implementing common use cases encountered when integrating AngularJS apps
 with the precorconnect identity service.

## Use Cases
#####Get Current Access Token
Retrieves the current access_token from browser storage. Primarily used to build an 
Authorization header to make an API call to a protected resource. 

#####Set Current Access Token
Sets the current access_token in browser storage.

#####Logout  
Logs out the currently logged in user by:  
1.  removing their accessToken from localStorage  
2.  redirecting them to the configured logoutUrl  

#####Get User Info
Gets userInfo for the current user.

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
        ["identityServiceModule"]);
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