/**
 * @class IdentityServiceSdkConfig
 * @constructor
 */
export class IdentityServiceSdkConfig {

    private _baseUrl:string;

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