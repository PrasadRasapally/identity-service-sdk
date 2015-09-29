import EmployeeOidcUserInfo from '../../src/employeeOidcUserInfo';
import OidcUserInfoFactory from '../../src/oidcUserInfoFactory';
import PartnerRepOidcUserInfo from '../../src/partnerRepOidcUserInfo';
import dummy from '../dummy';

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
                email: dummy.emailAddress,
                family_name: dummy.lastName,
                given_name: dummy.firstName,
                account_id: dummy.accountId,
                sap_vendor_number: dummy.sapVendorNumber,
                sub: `${dummy.partnerRepId}`,
                type: 'partnerRep'
            };

            const expectedPartnerRepOidcUserInfo =
                new PartnerRepOidcUserInfo(
                    partnerRepOidcUserInfoData.given_name,
                    partnerRepOidcUserInfoData.family_name,
                    partnerRepOidcUserInfoData.email,
                    partnerRepOidcUserInfoData.sub,
                    partnerRepOidcUserInfoData.account_id,
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
                email: dummy.emailAddress,
                family_name: dummy.lastName,
                given_name: dummy.firstName,
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