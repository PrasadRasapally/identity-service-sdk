import EmployeeOidcUserInfo from '../src/employeeOidcUserInfo';
import PartnerRepOidcUserInfo from '../src/partnerRepOidcUserInfo';

const dummy = {
    firstName: 'firstName',
    lastName: 'lastName',
    phoneNumber: '0000000000',
    emailAddress: 'fake-email@test.com',
    countryCode: 'US',
    url: 'https://test-url.com',
    accountId: '000000000000000000',
    sapVendorNumber: 'sapVendorNo',
    partnerRepId: 1,
    facilityId: '000000000000000000',
    facilityContactId: '000000000000000000'
};


dummy.employeeOidcUserInfo =
    new EmployeeOidcUserInfo(
        dummy.firstName,
        dummy.lastName,
        dummy.emailAddress
    );

dummy.partnerRepOidcUserInfo =
    new PartnerRepOidcUserInfo(
        dummy.firstName,
        dummy.lastName,
        dummy.emailAddress,
        `${dummy.partnerRepId}`,
        dummy.accountId,
        dummy.sapVendorNumber
    );

/**
 * dummy objects (see: http://xunitpatterns.com/Dummy%20Object.html)
 */
export default dummy;