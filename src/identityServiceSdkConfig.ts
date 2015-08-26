/**
 * @class IdentityServiceSdkConfig
 * @constructor
 */
export default class IdentityServiceSdkConfig {

    private _baseUrl:String;

    constructor(baseUrl:String) {

        if (!baseUrl) {
            throw 'baseUrl required';
        }
        this._baseUrl = baseUrl;

    }

    get baseUrl():String {
        return this._baseUrl;
    }

}