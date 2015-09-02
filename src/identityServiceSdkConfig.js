/**
 * @class {IdentityServiceSdkConfig}
 */
export default class IdentityServiceSdkConfig {

    _baseUrl:string;

    /**
     * @param {string} baseUrl
     */
    constructor(baseUrl:string) {

        if (!baseUrl) {
            throw 'baseUrl required';
        }
        this._baseUrl = baseUrl;

    }

    /**
     * @returns {string}
     */
    get baseUrl():string {
        return this._baseUrl;
    }

}