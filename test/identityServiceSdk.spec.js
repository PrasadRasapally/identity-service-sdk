import IdentityServiceSdkConfig from '../src/identityServiceSdkConfig'
import IdentityServiceSdk from '../src/identityServiceSdk';

const identityServiceSdkConfig = new IdentityServiceSdkConfig('https://identity-service-dev.precorconnect.com');
const accessTokenValidTill5138 = 'eyJhbGciOiJIUzI1NiJ9.eyJ0eXBlIjoicGFydG5lclJlcCIsImV4cCI6OTk5OTk5OTk5OTkuOTk5MDAwMDAwLCJhdWQiOiJodHRwczovL2lkZW50aXR5LXNlcnZpY2UtZGV2LnByZWNvcmNvbm5lY3QuY29tIiwiaXNzIjoiaHR0cHM6Ly9pZGVudGl0eS1zZXJ2aWNlLWRldi5wcmVjb3Jjb25uZWN0LmNvbSIsImdpdmVuX25hbWUiOiJ0ZXN0Z2l2ZW4iLCJmYW1pbHlfbmFtZSI6InRlc3RmYW1pbHkiLCJlbWFpbCI6InRlc3RAZW1haWwuY29tIiwic3ViIjoiMTIzNDU2Nzg5MCIsInBhcnRuZXJfc2FwX2FjY291bnRfbnVtYmVyIjoiMjM0MzI0MzIyMyIsInNhcF92ZW5kb3JfbnVtYmVyIjoiMzIxNDIzNDMzIn0.JyMC_H-M_YEWn8yj916lfj8SQboSrsttexmwceFP6-E';

describe('identity service sdk', () => {
    describe('import', () => {
        it('should import constructor', () => {

            /*
             act
             */
            const objectUnderTest =
                new IdentityServiceSdk(identityServiceSdkConfig);

            /*
             assert
             */
            expect(objectUnderTest).not.toBe(null);

        });
    });
    describe('get user info', () => {
        it('should return expected user info', (done) => {

            /*
             arrange
             */

            const expectedUserInfo = {
                email: 'test@email.com',
                family_name: 'testfamily',
                given_name: 'testgiven',
                partner_sap_account_number: '2343243223',
                sap_vendor_number: '321423433',
                sub: '1234567890',
                type: 'partnerRep'
            };

            const objectUnderTest =
                new IdentityServiceSdk(identityServiceSdkConfig);


            /*
             act
             */
            let actualUserInfoPromise = objectUnderTest.getUserInfo(accessTokenValidTill5138);

            /*
             assert
             */

            actualUserInfoPromise
                .then((actualUserInfo) => {
                    expect(actualUserInfo).toEqual(expectedUserInfo);
                    done();
                })
                .catch((error)=> {
                    expect(error).toBeUndefined();
                    done();
                });

        })
    })
});