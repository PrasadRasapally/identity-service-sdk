import IdentityServiceSdk from '../../src/index';
import config from './config';
import factory from './factory';
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


                const accessToken =
                    factory.constructValidPartnerRepOAuth2AccessToken(
                        expectedPartnerRepOidcUserInfo
                    );

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
                    .catch(error=> done.fail(JSON.stringify(error)));

            });
            it('returns EmployeeOidcUserInfo', (done) => {

                /*
                 arrange
                 */

                const expectedEmployeeOidcUserInfo = dummy.employeeOidcUserInfo;

                const accessToken =
                    factory.constructValidEmployeeOAuth2AccessToken(
                        expectedEmployeeOidcUserInfo
                    );

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
                    .catch(error=> done.fail(JSON.stringify(error)));

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
                        factory.constructValidPartnerRepOAuth2AccessToken(
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
                    .catch(error=> done.fail(JSON.stringify(error)));

            })
        });

    });

});