System.register(['../../src/index'], function(exports_1) {
    var index_1;
    var identityServiceSdkConfig, accessTokenValidTill5138;
    return {
        setters:[
            function (_index_1) {
                index_1 = _index_1;
            }],
        execute: function() {
            identityServiceSdkConfig = new index_1.IdentityServiceSdkConfig('https://identity-service-dev.precorconnect.com');
            accessTokenValidTill5138 = 'eyJhbGciOiJIUzI1NiJ9.eyJ0eXBlIjoicGFydG5lclJlcCIsImV4cCI6OTk5OTk5OTk5OTkuOTk5MDAwMDAwLCJhdWQiOiJodHRwczovL2lkZW50aXR5LXNlcnZpY2UtZGV2LnByZWNvcmNvbm5lY3QuY29tIiwiaXNzIjoiaHR0cHM6Ly9pZGVudGl0eS1zZXJ2aWNlLWRldi5wcmVjb3Jjb25uZWN0LmNvbSIsImdpdmVuX25hbWUiOiJ0ZXN0Z2l2ZW4iLCJmYW1pbHlfbmFtZSI6InRlc3RmYW1pbHkiLCJlbWFpbCI6InRlc3RAZW1haWwuY29tIiwic3ViIjoiMTIzNDU2Nzg5MCIsInBhcnRuZXJfc2FwX2FjY291bnRfbnVtYmVyIjoiMjM0MzI0MzIyMyIsInNhcF92ZW5kb3JfbnVtYmVyIjoiMzIxNDIzNDMzIn0.JyMC_H-M_YEWn8yj916lfj8SQboSrsttexmwceFP6-E';
            describe('identity service sdk', function () {
                describe('import', function () {
                    it('should import constructor', function () {
                        /*
                         act
                         */
                        var objectUnderTest = new index_1.default(identityServiceSdkConfig);
                        /*
                         assert
                         */
                        expect(objectUnderTest).not.toBe(null);
                    });
                });
                describe('get user info', function () {
                    it('should return expected user info', function (done) {
                        /*
                         arrange
                         */
                        var expectedUserInfo = {
                            email: 'test@email.com',
                            family_name: 'testfamily',
                            given_name: 'testgiven',
                            partner_sap_account_number: '2343243223',
                            sap_vendor_number: '321423433',
                            sub: '1234567890',
                            type: 'partnerRep'
                        };
                        var objectUnderTest = new index_1.default(identityServiceSdkConfig);
                        /*
                         act
                         */
                        var actualUserInfoPromise = objectUnderTest.getUserInfo(accessTokenValidTill5138);
                        /*
                         assert
                         */
                        actualUserInfoPromise
                            .then(function (actualUserInfo) {
                            expect(actualUserInfo).toEqual(expectedUserInfo);
                            done();
                        })
                            .catch(function (error) {
                            expect(error).toBeUndefined();
                            done();
                        });
                    });
                });
                describe('refresh access token', function () {
                    it('should return access token', function (done) {
                        /*
                         arrange
                         */
                        var objectUnderTest = new index_1.default(identityServiceSdkConfig);
                        /*
                         act
                         */
                        var accessTokenPromise = objectUnderTest.refreshAccessToken(accessTokenValidTill5138);
                        /*
                         assert
                         */
                        accessTokenPromise
                            .then(function (accessToken) {
                            expect(accessToken).not.toBeNull();
                            done();
                        })
                            .catch(function (error) {
                            expect(error).toBeUndefined();
                            done();
                        });
                    });
                });
            });
        }
    }
});
//# sourceMappingURL=index.spec.js.map