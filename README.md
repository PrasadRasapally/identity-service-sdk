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

**add jspm package dependency**  
```shell
jspm install bitbucket:precorconnect/identity-service-angularjs-sdk
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