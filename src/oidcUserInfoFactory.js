import PartnerRepOidcUserInfo from './partnerRepOidcUserInfo';
import EmployeeUserInfo from './employeeOidcUserInfo';
import OidcUserInfo from './oidcUserInfo';

export default class OidcUserInfoFactory {

    static construct(data):OidcUserInfo {
        if (data.type == 'partnerRep') {
            return new PartnerRepOidcUserInfo(
                data.given_name,
                data.family_name,
                data.sub,
                data.account_id,
                data.sap_vendor_number
            );
        }
        else if (data.type == 'employee') {
            return new EmployeeUserInfo(
                data.given_name,
                data.family_name,
                data.sub
            );
        }
        else throw new TypeError('received unsupported type');
    }

}
