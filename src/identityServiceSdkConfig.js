/**
 * @class IdentityServiceSdkConfig
 * @constructor
 */
export default class IdentityServiceSdkConfig {

    constructor(baseUrl) {

        if (!baseUrl) {
            throw 'baseUrl required';
        }
        this._baseUrl = baseUrl;

    }

    get baseUrl() {
        return this._baseUrl;
    }

}