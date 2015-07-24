## Description
An AngularJS Module implementing common use cases encountered when integrating AngularJS apps
 with the precorconnect identity service.

## Use Cases
#####Get Current Access Token
Retrieves the current access_token from browser storage. Primarily used to build an 
Authorization header to make an API call to a protected resource. 

#####Get SSO Login URL
Gets a URL for initiating a SSO login flow and persists the resulting access_token to browser storage.

#####Login
Logs the user in with the provided accessToken and saves it to browser localStorage. 
Executes callbacks previously passed to [subscribeToLoginEvents](#subscribetologinevents)

#####Logout
Logs out the currently logged in user and removes their accessToken from localStorage. 
Executes callbacks previously passed to [subscribeToLogoutEvents](#subscribetologoutevents)

#####Subscribe To Login Events  
Subscribes a callback to login events. In the event of a login the callback will be invoked
with the logged in users info.

#####Subscribe To Logout Events  
Subscribes a callback to logout events. In the event of a logout for any reason the callback
will be invoked.

#####Try Get User Info With Current Access Token
Attempts to get userInfo with the current accessToken.
Primarily used to obtain user info upon initial page load.

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