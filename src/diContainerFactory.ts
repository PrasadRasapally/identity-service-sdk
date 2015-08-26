import {Container} from 'aurelia-dependency-injection';
import IdentityServiceSdkConfig from './identityServiceSdkConfig';
import {HttpClient} from 'aurelia-http-client';
import GetUserInfoUseCase from './getUserInfoUseCase';
import RefreshAccessTokenUseCase from './refreshAccessTokenUseCase';

/**
 * @class DiContainerFactory
 * @constructor
 */
export default class DiContainerFactory {

    private _config:IdentityServiceSdkConfig;

    constructor(config:IdentityServiceSdkConfig) {

        if (!config) {
            throw 'config required';
        }
        this._config = config;

    }

    /**
     *
     * @returns {Container} dependency injection container
     */
    construct():Container {

        const container = new Container();

        container.registerInstance(IdentityServiceSdkConfig, this._config);
        container.autoRegister(HttpClient);

        DiContainerFactory._registerUseCases(container);

        return container;

    }

    private static _registerUseCases(container) {

        container.autoRegister(GetUserInfoUseCase);
        container.autoRegister(RefreshAccessTokenUseCase);

    }

}
