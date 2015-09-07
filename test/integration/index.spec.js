import IdentityServiceSdk,
{
    EmployeeOidcUserInfo,
    PartnerRepOidcUserInfo,
} from '../../src/index';
import jwt from 'jwt-simple';
import config from './config';
import dummy from '../dummy';

/*
 test methods
 */
describe('Index module', () => {

    describe('default export', () => {
        it('should be IdentityServiceSdk constructor', () => {

            /*
             act
             */
            const objectUnderTest =
                new IdentityServiceSdk(config.identityServiceSdkConfig);

            /*
             assert
             */
            expect(objectUnderTest).toEqual(jasmine.any(IdentityServiceSdk));

        });
    });

    describe('instance of default export', () => {

        describe('getUserInfo method', () => {
            it('returns PartnerRepOidcUserInfo', (done) => {

                /*
                 arrange
                 */

                const expectedPartnerRepOidcUserInfo = dummy.partnerRepOidcUserInfo;


                const accessToken = constructValidPartnerRepOAuth2AccessToken(expectedPartnerRepOidcUserInfo);

                const objectUnderTest =
                    new IdentityServiceSdk(config.identityServiceSdkConfig);


                /*
                 act
                 */
                const actualUserInfoPromise = objectUnderTest.getUserInfo(accessToken);

                /*
                 assert
                 */

                actualUserInfoPromise
                    .then((actualPartnerRepOidcUserInfo) => {
                        expect(actualPartnerRepOidcUserInfo).toEqual(expectedPartnerRepOidcUserInfo);
                        done();
                    })
                    .catch((error)=> {
                        fail(error);
                        done();
                    });

            });
            it('returns EmployeeOidcUserInfo', (done) => {

                /*
                 arrange
                 */

                const expectedEmployeeOidcUserInfo = dummy.employeeOidcUserInfo;

                const accessToken = constructValidEmployeeOAuth2AccessToken(expectedEmployeeOidcUserInfo);

                const objectUnderTest =
                    new IdentityServiceSdk(config.identityServiceSdkConfig);


                /*
                 act
                 */
                const actualUserInfoPromise = objectUnderTest.getUserInfo(accessToken);

                /*
                 assert
                 */

                actualUserInfoPromise
                    .then((actualEmployeeOidcUserInfo) => {
                        expect(actualEmployeeOidcUserInfo).toEqual(expectedEmployeeOidcUserInfo);
                        done();
                    })
                    .catch((error)=> {
                        fail(error);
                        done();
                    });

            })
        });

        describe('refreshAccessToken method', () => {
            it('should return access token', (done) => {

                /*
                 arrange
                 */

                const objectUnderTest =
                    new IdentityServiceSdk(config.identityServiceSdkConfig);

                /*
                 act
                 */
                const accessTokenPromise =
                    objectUnderTest.refreshAccessToken(
                        constructValidPartnerRepOAuth2AccessToken(
                            dummy.partnerRepOidcUserInfo
                        )
                    );

                /*
                 assert
                 */

                accessTokenPromise
                    .then((accessToken) => {
                        expect(accessToken).not.toBeNull();
                        done();
                    })
                    .catch((error)=> {
                        fail(error);
                        done();
                    });

            })
        });

    }, 20000);

});

/*
 factory methods
 */
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
        "partner_sap_account_number": partnerRepOidcUserInfo.partner_sap_account_number,
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