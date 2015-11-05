import EmployeeOidcUserInfo from '../src/employeeOidcUserInfo';
import PartnerRepOidcUserInfo from '../src/partnerRepOidcUserInfo';

const dummy = {
    firstName: 'firstName',
    lastName: 'lastName',
    phoneNumber: '0000000000',
    userId: 'fake-email@test.com',
    countryCode: 'US',
    url: 'https://test-url.com',
    accountId: '000000000000000000',
    sapVendorNumber: '0000000000',
    facilityId: '000000000000000000',
    facilityContactId: '000000000000000000'
};


dummy.employeeOidcUserInfo =
    new EmployeeOidcUserInfo(
        dummy.firstName,
        dummy.lastName,
        dummy.userId
    );

dummy.partnerRepOidcUserInfo =
    new PartnerRepOidcUserInfo(
        dummy.firstName,
        dummy.lastName,
        dummy.userId,
        dummy.accountId,
        dummy.sapVendorNumber
    );

/**
 * dummy objects (see: http://xunitpatterns.com/Dummy%20Object.html)
 */
export default dummy;