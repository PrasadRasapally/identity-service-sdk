import PartnerRepOidcUserInfo from '../../src/partnerRepOidcUserInfo';

/*
 dummy data fields
 */
const validFirstName = 'given_name';
const validLastName = 'family_name';
const validEmailAddress = 'test.email@email.com';
const validSapAccountNumber = 'sapAccountNo';
const validSapVendorNumber = 'sapVendorNo';
const validPartnerRepId = 1;

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
                            validLastName,
                            validEmailAddress,
                            `${validPartnerRepId}`,
                            validSapAccountNumber,
                            validSapVendorNumber
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
            const expectedGiven_name = validFirstName;

            /*
             act
             */
            const objectUnderTest =
                new PartnerRepOidcUserInfo(
                    expectedGiven_name,
                    validLastName,
                    validEmailAddress,
                    `${validPartnerRepId}`,
                    validSapAccountNumber,
                    validSapVendorNumber
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
                        validFirstName,
                        null,
                        validEmailAddress,
                        `${validPartnerRepId}`,
                        validSapAccountNumber,
                        validSapVendorNumber
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
            const expectedFamily_name = validLastName;

            /*
             act
             */
            const objectUnderTest =
                new PartnerRepOidcUserInfo(
                    validFirstName,
                    expectedFamily_name,
                    validEmailAddress,
                    `${validPartnerRepId}`,
                    validSapAccountNumber,
                    validSapVendorNumber
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
                        validFirstName,
                        validLastName,
                        null,
                        `${validPartnerRepId}`,
                        validSapAccountNumber,
                        validSapVendorNumber
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
            const expectedEmail = validEmailAddress;

            /*
             act
             */
            const objectUnderTest =
                new PartnerRepOidcUserInfo(
                    validFirstName,
                    validLastName,
                    expectedEmail,
                    `${validPartnerRepId}`,
                    validSapAccountNumber,
                    validSapVendorNumber
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
                        validFirstName,
                        validLastName,
                        validEmailAddress,
                        null,
                        validSapAccountNumber,
                        validSapVendorNumber
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
            const expectedSub = `${validPartnerRepId}`;

            /*
             act
             */
            const objectUnderTest =
                new PartnerRepOidcUserInfo(
                    validFirstName,
                    validLastName,
                    validEmailAddress,
                    expectedSub,
                    validSapAccountNumber,
                    validSapVendorNumber
                );

            /*
             assert
             */
            const actualSub =
                objectUnderTest.sub;

            expect(actualSub).toEqual(expectedSub);

        });
        it('does not throw if partner_sap_account_number is null', () => {
            /*
             arrange
             */
            const constructor =
                () =>
                    new PartnerRepOidcUserInfo(
                        validFirstName,
                        validLastName,
                        validEmailAddress,
                        `${validPartnerRepId}`,
                        null,
                        validSapVendorNumber
                    );

            /*
             act/assert
             */
            expect(constructor).not.toThrow();

        });
        it('sets partner_sap_account_number', () => {
            /*
             arrange
             */
            const expectedPartner_sap_account_number = validSapAccountNumber;

            /*
             act
             */
            const objectUnderTest =
                new PartnerRepOidcUserInfo(
                    validFirstName,
                    validLastName,
                    validEmailAddress,
                    `${validPartnerRepId}`,
                    expectedPartner_sap_account_number,
                    validSapVendorNumber
                );

            /*
             assert
             */
            const actualPartner_sap_account_number =
                objectUnderTest.partner_sap_account_number;

            expect(actualPartner_sap_account_number).toEqual(expectedPartner_sap_account_number);

        });

        it('does not throw if sap_vendor_number is null', () => {
            /*
             arrange
             */
            const constructor =
                () =>
                    new PartnerRepOidcUserInfo(
                        validFirstName,
                        validLastName,
                        validEmailAddress,
                        `${validPartnerRepId}`,
                        validSapAccountNumber,
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
            const expectedSap_vendor_number = validSapVendorNumber;

            /*
             act
             */
            const objectUnderTest =
                new PartnerRepOidcUserInfo(
                    validFirstName,
                    validLastName,
                    validEmailAddress,
                    `${validPartnerRepId}`,
                    validSapAccountNumber,
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
