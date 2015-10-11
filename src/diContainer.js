import {Container} from 'aurelia-dependency-injection';
import IdentityServiceSdkConfig from './identityServiceSdkConfig';
import {HttpClient} from 'aurelia-http-client';
import GetUserInfoFeature from './getUserInfoFeature';
import RefreshAccessTokenFeature from './refreshAccessTokenFeature';

/**
 * @class {DiContainer}
 */
export default class DiContainer {

    _container:Container;

    /**
     * @param {IdentityServiceSdkConfig} config
     */
    constructor(config:IdentityServiceSdkConfig) {

        if (!config) {
            throw 'config required';
        }

        this._container = new Container();

        this._container.registerInstance(IdentityServiceSdkConfig, config);
        this._container.autoRegister(HttpClient);

        this._registerFeatures();

    }

    /**
     * Resolves a single instance based on the provided key.
     * @param key The key that identifies the object to resolve.
     * @return Returns the resolved instance.
     */
    get(key:any):any {
        return this._container.get(key);
    }

    _registerFeatures() {

        this._container.autoRegister(GetUserInfoFeature);
        this._container.autoRegister(RefreshAccessTokenFeature);

    }

}
