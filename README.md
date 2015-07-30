## Description
An AngularJS Module implementing common use cases encountered when integrating AngularJS apps
 with the precorconnect identity service.

## Use Cases

#####Get User Info
Gets userInfo via the provided access token.

#####Refresh Access Token  
Refreshes the provided access token. Primarily used to refresh an access token for the
purposes of maintaining an active session without redirecting the client browser to re-authenticate.

## Installation  

**install required dependencies:**  
-  [angular](https://angularjs.org/)  

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

#### Example
```js
angular.module(
        "app",
        ["identityServiceSdk.module"])
        .config(
        [
            "identityServiceSdk.configProvider",
            appConfig
        ]);

    function appConfig(identityServiceSdk_configProvider) {
        identityServiceSdk_configProvider
            .setBaseUrl("@@identityServiceBaseUrl");
    }
```