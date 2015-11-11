## Description
Precor Connect identity service SDK for javascript.

## Features

##### Get User Info
* [documentation](features/GetUserInfo.feature)

##### Refresh Access Token  
* [documentation](features/RefreshAccessToken.feature)

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
        "https://api-dev.precorconnect.com"
    );
    
const identityServiceSdk = 
    new IdentityServiceSdk(
        identityServiceSdkConfig
    );
```

## Platform Support

This library can be used in the **browser**.

## Develop

#### Software
- git
- npm

#### Scripts

install dependencies (perform prior to running or testing locally)
```PowerShell
npm install
```

unit & integration test in multiple browsers/platforms
```PowerShell
# note: following environment variables must be present:
# SAUCE_USERNAME
# SAUCE_ACCESS_KEY
npm test
```