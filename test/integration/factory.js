import IdentityServiceSdk,
{
    EmployeeOidcUserInfo,
    PartnerRepOidcUserInfo,
} from '../../src/index';
import config from './config';
import jwt from 'jwt-simple';
import dummy from '../dummy';

export default {
    constructValidPartnerRepOAuth2AccessToken,
    constructValidEmployeeOAuth2AccessToken
}

function constructValidPartnerRepOAuth2AccessToken(partnerRepOidcUserInfo:PartnerRepOidcUserInfo):string {

    const tenMinutesInMilliseconds = 10000 * 60;

    const jwtPayload = {
        "type": 'partnerRep',
        "exp": Date.now() + tenMinutesInMilliseconds,
        "aud": dummy.url,
        "iss": dummy.url,
        "given_name": partnerRepOidcUserInfo.given_name,
        "family_name": partnerRepOidcUserInfo.family_name,
        "email": partnerRepOidcUserInfo.email,
        "sub": partnerRepOidcUserInfo.sub,
        "account_id": partnerRepOidcUserInfo.account_id,
        "sap_vendor_number": partnerRepOidcUserInfo.sap_vendor_number
    };

    return jwt.encode(jwtPayload, config.identityServiceJwtSigningKey);
}

function constructValidEmployeeOAuth2AccessToken(employeeOidcUserInfo:EmployeeOidcUserInfo):string {

    const tenMinutesInMilliseconds = 10000 * 60;

    const jwtPayload = {
        "type": 'employee',
        "exp": Date.now() + tenMinutesInMilliseconds,
        "aud": dummy.url,
        "iss": dummy.url,
        "given_name": employeeOidcUserInfo.given_name,
        "family_name": employeeOidcUserInfo.family_name,
        "email": employeeOidcUserInfo.email
    };

    return jwt.encode(jwtPayload, config.identityServiceJwtSigningKey);
}