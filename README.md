## Description
The precorconnect identity service javascript SDK.

## Use Cases

#####Get User Info
Gets userInfo via the provided access token.

#####Refresh Access Token  
Refreshes the provided access token. Primarily used to refresh an access token for the
purposes of maintaining an active session without redirecting the client browser to re-authenticate.

## Installation  

**add jspm package dependency**  
```shell
jspm install identity-service-sdk=bitbucket:precorconnect/identity-service-javascript-sdk
``` 

**import**
```js
import IdentityServiceSdkConfig from 'identity-service-sdk/IdentityServiceSdkConfig';
import IdentityServiceSdk from 'identity-service-sdk';

const identityServiceSdkConfig = new IdentityServiceSdkConfig("https://identity-service-dev.precorconnect.com");
const identityServiceSdk = new IdentityServiceSdk(identityServiceSdkConfig);
```

## Platform Support

This library can be used in the **browser**.