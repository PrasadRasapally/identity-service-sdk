import PartnerRepOidcUserInfo from '../../src/partnerRepOidcUserInfo';
import dummy from '../dummy';

/*
 test methods
 */
describe('PartnerRepOidcUserInfo class', () => {
    describe('constructor', () => {
        it('throws if given_name is null', () => {
                /*
                 arrange
                 */
                const constructor =
                    () =>
                        new PartnerRepOidcUserInfo(
                            null,
                            dummy.lastName,
                            dummy.emailAddress,
                            `${dummy.partnerRepId}`,
                            dummy.accountId,
                            dummy.sapVendorNumber
                        );

                /*
                 act/assert
                 */
                expect(constructor).toThrowError(TypeError, 'given_name required');

            }
        );
        it('sets given_name', () => {
            /*
             arrange
             */
            const expectedGiven_name = dummy.firstName;

            /*
             act
             */
            const objectUnderTest =
                new PartnerRepOidcUserInfo(
                    expectedGiven_name,
                    dummy.lastName,
                    dummy.emailAddress,
                    `${dummy.partnerRepId}`,
                    dummy.accountId,
                    dummy.sapVendorNumber
                );

            /*
             assert
             */
            const actualGiven_name =
                objectUnderTest.given_name;

            expect(actualGiven_name).toEqual(expectedGiven_name);

        });
        it('throws if family_name is null', () => {
            /*
             arrange
             */
            const constructor =
                () =>
                    new PartnerRepOidcUserInfo(
                        dummy.firstName,
                        null,
                        dummy.emailAddress,
                        `${dummy.partnerRepId}`,
                        dummy.accountId,
                        dummy.sapVendorNumber
                    );

            /*
             act/assert
             */
            expect(constructor).toThrowError(TypeError, 'family_name required');

        });
        it('sets family_name', () => {
            /*
             arrange
             */
            const expectedFamily_name = dummy.lastName;

            /*
             act
             */
            const objectUnderTest =
                new PartnerRepOidcUserInfo(
                    dummy.firstName,
                    expectedFamily_name,
                    dummy.emailAddress,
                    `${dummy.partnerRepId}`,
                    dummy.accountId,
                    dummy.sapVendorNumber
                );

            /*
             assert
             */
            const actualFamily_name =
                objectUnderTest.family_name;

            expect(actualFamily_name).toEqual(expectedFamily_name);

        });

        it('throws if email is null', () => {
            /*
             arrange
             */
            const constructor =
                () =>
                    new PartnerRepOidcUserInfo(
                        dummy.firstName,
                        dummy.lastName,
                        null,
                        `${dummy.partnerRepId}`,
                        dummy.accountId,
                        dummy.sapVendorNumber
                    );

            /*
             act/assert
             */
            expect(constructor).toThrowError(TypeError, 'email required');

        });
        it('sets email', () => {
            /*
             arrange
             */
            const expectedEmail = dummy.emailAddress;

            /*
             act
             */
            const objectUnderTest =
                new PartnerRepOidcUserInfo(
                    dummy.firstName,
                    dummy.lastName,
                    expectedEmail,
                    `${dummy.partnerRepId}`,
                    dummy.accountId,
                    dummy.sapVendorNumber
                );

            /*
             assert
             */
            const actualEmail =
                objectUnderTest.email;

            expect(actualEmail).toEqual(expectedEmail);

        });

        it('throws if sub is null', () => {
            /*
             arrange
             */
            const constructor =
                () =>
                    new PartnerRepOidcUserInfo(
                        dummy.firstName,
                        dummy.lastName,
                        dummy.emailAddress,
                        null,
                        dummy.accountId,
                        dummy.sapVendorNumber
                    );

            /*
             act/assert
             */
            expect(constructor).toThrowError(
                TypeError,
                'sub required'
            );

        });
        it('sets sub', () => {
            /*
             arrange
             */
            const expectedSub = `${dummy.partnerRepId}`;

            /*
             act
             */
            const objectUnderTest =
                new PartnerRepOidcUserInfo(
                    dummy.firstName,
                    dummy.lastName,
                    dummy.emailAddress,
                    expectedSub,
                    dummy.accountId,
                    dummy.sapVendorNumber
                );

            /*
             assert
             */
            const actualSub =
                objectUnderTest.sub;

            expect(actualSub).toEqual(expectedSub);

        });
        it('throws if account_id is null', () => {
            /*
             arrange
             */
            const constructor =
                () =>
                    new PartnerRepOidcUserInfo(
                        dummy.firstName,
                        dummy.lastName,
                        dummy.emailAddress,
                        `${dummy.partnerRepId}`,
                        null,
                        dummy.sapVendorNumber
                    );

            /*
             act/assert
             */
            expect(constructor).toThrowError(
                TypeError,
                'account_id required'
            );

        });
        it('sets account_id', () => {
            /*
             arrange
             */
            const expectedAccount_id = dummy.accountId;

            /*
             act
             */
            const objectUnderTest =
                new PartnerRepOidcUserInfo(
                    dummy.firstName,
                    dummy.lastName,
                    dummy.emailAddress,
                    `${dummy.partnerRepId}`,
                    expectedAccount_id,
                    dummy.sapVendorNumber
                );

            /*
             assert
             */
            const actualAccount_id =
                objectUnderTest.account_id;

            expect(actualAccount_id).toEqual(expectedAccount_id);

        });

        it('does not throw if sap_vendor_number is null', () => {
            /*
             arrange
             */
            const constructor =
                () =>
                    new PartnerRepOidcUserInfo(
                        dummy.firstName,
                        dummy.lastName,
                        dummy.emailAddress,
                        `${dummy.partnerRepId}`,
                        dummy.accountId,
                        null
                    );

            /*
             act/assert
             */
            expect(constructor).not.toThrow();

        });
        it('sets sap_vendor_number', () => {
            /*
             arrange
             */
            const expectedSap_vendor_number = dummy.sapVendorNumber;

            /*
             act
             */
            const objectUnderTest =
                new PartnerRepOidcUserInfo(
                    dummy.firstName,
                    dummy.lastName,
                    dummy.emailAddress,
                    `${dummy.partnerRepId}`,
                    dummy.accountId,
                    expectedSap_vendor_number
                );

            /*
             assert
             */
            const actualSap_vendor_number =
                objectUnderTest.sap_vendor_number;

            expect(actualSap_vendor_number).toEqual(expectedSap_vendor_number);

        });
    });
});
