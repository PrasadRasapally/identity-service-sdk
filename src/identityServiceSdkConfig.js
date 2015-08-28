/**
 * @class IdentityServiceSdkConfig
 * @constructor
 */
export default class IdentityServiceSdkConfig {

    _baseUrl:string;

    constructor(baseUrl:string) {

        if (!baseUrl) {
            throw 'baseUrl required';
        }
        this._baseUrl = baseUrl;

    }

    get baseUrl():string {
        return this._baseUrl;
    }

}