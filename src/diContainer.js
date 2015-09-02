import {Container} from 'aurelia-dependency-injection';
import IdentityServiceSdkConfig from './identityServiceSdkConfig';
import {HttpClient} from 'aurelia-http-client';
import GetUserInfoUseCase from './getUserInfoUseCase';
import RefreshAccessTokenUseCase from './refreshAccessTokenUseCase';

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

        this._registerUseCases();

    }

    /**
     * Resolves a single instance based on the provided key.
     * @param key The key that identifies the object to resolve.
     * @return Returns the resolved instance.
     */
    get(key:any):any {
        return this._container.get(key);
    }

    _registerUseCases() {

        this._container.autoRegister(GetUserInfoUseCase);
        this._container.autoRegister(RefreshAccessTokenUseCase);

    }

}
