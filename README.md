## Description
Precorconnect identity service SDK for javascript.

## Use Cases

#####Get User Info
Gets userInfo via the provided access token.

#####Refresh Access Token  
Refreshes the provided access token. Primarily used to refresh an access token for the
purposes of maintaining an active session without redirecting the client browser to re-authenticate.

## Setup  

**install via jspm**  
```shell
jspm install identity-service-sdk=bitbucket:precorconnect/identity-service-sdk-for-javascript
``` 

**import & instantiate**
```js
import IdentityServiceSdk,{IdentityServiceSdkConfig} from 'identity-service-sdk';

const identityServiceSdkConfig = 
    new IdentityServiceSdkConfig(
        "https://identity-service-dev.precorconnect.com"
    );
    
const identityServiceSdk = 
    new IdentityServiceSdk(
        identityServiceSdkConfig
    );
```

## Platform Support

This library can be used in the **browser**.