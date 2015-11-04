/**
 * @class {IdentityServiceSdkConfig}
 */
export default class IdentityServiceSdkConfig {

    _precorConnectApiBaseUrl:string;

    /**
     * @param {string} precorConnectApiBaseUrl
     */
    constructor(precorConnectApiBaseUrl:string) {

        if (!precorConnectApiBaseUrl) {
            throw 'precorConnectApiBaseUrl required';
        }
        this._precorConnectApiBaseUrl = precorConnectApiBaseUrl;

    }

    /**
     * @returns {string}
     */
    get precorConnectApiBaseUrl():string {
        return this._precorConnectApiBaseUrl;
    }

}