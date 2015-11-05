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
                            dummy.userId,
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
                    dummy.userId,
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
                        dummy.userId,
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
                    dummy.userId,
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

        it('throws if sub is null', () => {
            /*
             arrange
             */
            const constructor =
                () =>
                    new PartnerRepOidcUserInfo(
                        dummy.firstName,
                        dummy.lastName,
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
            const expectedSub = dummy.userId;

            /*
             act
             */
            const objectUnderTest =
                new PartnerRepOidcUserInfo(
                    dummy.firstName,
                    dummy.lastName,
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
                        dummy.userId,
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
                    dummy.userId,
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
                        dummy.userId,
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
                    dummy.userId,
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
