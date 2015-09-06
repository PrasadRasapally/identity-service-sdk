import EmployeeOidcUserInfo from '../../src/employeeOidcUserInfo';
import OidcUserInfoFactory from '../../src/oidcUserInfoFactory';
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
describe('OidcUserInfoFactory class', () => {
    describe('construct method', () => {
        it('returns expected instance of PartnerRepOidcUserInfo', () => {
            /*
             arrange
             */
            const partnerRepOidcUserInfoData = {
                email: validEmailAddress,
                family_name: validLastName,
                given_name: validFirstName,
                partner_sap_account_number: validSapAccountNumber,
                sap_vendor_number: validSapVendorNumber,
                sub: `${validPartnerRepId}`,
                type: 'partnerRep'
            };

            const expectedPartnerRepOidcUserInfo =
                new PartnerRepOidcUserInfo(
                    partnerRepOidcUserInfoData.given_name,
                    partnerRepOidcUserInfoData.family_name,
                    partnerRepOidcUserInfoData.email,
                    partnerRepOidcUserInfoData.sub,
                    partnerRepOidcUserInfoData.partner_sap_account_number,
                    partnerRepOidcUserInfoData.sap_vendor_number
                );

            /*
             act
             */
            const actualPartnerRepOidcUserInfo =
                OidcUserInfoFactory.construct(partnerRepOidcUserInfoData);

            /*
             assert
             */
            expect(actualPartnerRepOidcUserInfo).toEqual(expectedPartnerRepOidcUserInfo);

        });
        it('returns expected instance of EmployeeOidcUserInfo', () => {
            /*
             arrange
             */
            const employeeOidcUserInfoData = {
                email: validEmailAddress,
                family_name: validLastName,
                given_name: validFirstName,
                type: 'employee'
            };

            const expectedEmployeeOidcUserInfo =
                new EmployeeOidcUserInfo(
                    employeeOidcUserInfoData.given_name,
                    employeeOidcUserInfoData.family_name,
                    employeeOidcUserInfoData.email
                );

            /*
             act
             */
            const actualEmployeeOidcUserInfo =
                OidcUserInfoFactory.construct(employeeOidcUserInfoData);

            /*
             assert
             */
            expect(actualEmployeeOidcUserInfo).toEqual(expectedEmployeeOidcUserInfo);

        })
    });
});