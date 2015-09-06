import IdentityServiceSdk,
{
    EmployeeOidcUserInfo,
    PartnerRepOidcUserInfo,
    IdentityServiceSdkConfig
} from '../../src/index';
import jwt from 'jwt-simple';

/*
 config fields
 */
const identityServiceSdkConfig = new IdentityServiceSdkConfig('https://identity-service-dev.precorconnect.com');
const identityServiceJwtSigningKey = 'nbho9k9vcv8r48xGQs4woyN8BJ6q9X1efj295KXfS9A9yHJSRm0oU21j3ickrScQ';

/*
 dummy data
 */
const validUrl = 'https://dummy-url.com';
const validPartnerRepId = 1;
const validEmailAddress = 'email@test.com';
const validFirstName = 'firstName';
const validLastName = 'lastName';
const validSapAccountNumber = 'sapAccountNo';
const validSapVendorNumber = 'sapVendorNo';
const validPartnerRepOidcUserInfo =
    new PartnerRepOidcUserInfo(
        validFirstName,
        validLastName,
        validEmailAddress,
        `${validPartnerRepId}`,
        validSapAccountNumber,
        validSapVendorNumber
    );
const validEmployeeOidcUserInfo =
    new EmployeeOidcUserInfo(
        validFirstName,
        validLastName,
        validEmailAddress
    );

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
                new IdentityServiceSdk(identityServiceSdkConfig);

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

                const expectedPartnerRepOidcUserInfo = validPartnerRepOidcUserInfo;


                const accessToken = constructValidPartnerRepOAuth2AccessToken(expectedPartnerRepOidcUserInfo);

                const objectUnderTest =
                    new IdentityServiceSdk(identityServiceSdkConfig);


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

                const expectedEmployeeOidcUserInfo = validEmployeeOidcUserInfo;

                const accessToken = constructValidEmployeeOAuth2AccessToken(expectedEmployeeOidcUserInfo);

                const objectUnderTest =
                    new IdentityServiceSdk(identityServiceSdkConfig);


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
                    new IdentityServiceSdk(identityServiceSdkConfig);

                /*
                 act
                 */
                const accessTokenPromise =
                    objectUnderTest.refreshAccessToken(
                        constructValidPartnerRepOAuth2AccessToken(
                            validPartnerRepOidcUserInfo
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
        "aud": validUrl,
        "iss": validUrl,
        "given_name": partnerRepOidcUserInfo.given_name,
        "family_name": partnerRepOidcUserInfo.family_name,
        "email": partnerRepOidcUserInfo.email,
        "sub": partnerRepOidcUserInfo.sub,
        "partner_sap_account_number": partnerRepOidcUserInfo.partner_sap_account_number,
        "sap_vendor_number": partnerRepOidcUserInfo.sap_vendor_number
    };

    return jwt.encode(jwtPayload, identityServiceJwtSigningKey);
}

function constructValidEmployeeOAuth2AccessToken(employeeOidcUserInfo:EmployeeOidcUserInfo):string {

    const tenMinutesInMilliseconds = 10000 * 60;

    const jwtPayload = {
        "type": 'employee',
        "exp": Date.now() + tenMinutesInMilliseconds,
        "aud": validUrl,
        "iss": validUrl,
        "given_name": employeeOidcUserInfo.given_name,
        "family_name": employeeOidcUserInfo.family_name,
        "email": employeeOidcUserInfo.email
    };

    return jwt.encode(jwtPayload, identityServiceJwtSigningKey);
}