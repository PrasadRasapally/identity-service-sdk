import {Container} from 'aurelia-dependency-injection';
import IdentityServiceSdkConfig from './identityServiceSdkConfig';
import fetch from 'fetch';
import HttpClient from 'aurelia-fetch-client';
import GetUserInfoUseCase from './getUserInfoUseCase';
import RefreshAccessTokenUseCase from './refreshAccessTokenUseCase';

class DiContainerFactory {

    constructor(config) {

        if (!config) {
            throw 'config required';
        }
        this._config = new Container();

    }

    /**
     *
     * @param {IdentityServiceSdkConfig} config
     * @returns {Container} dependency injection container
     */
    static construct(config) {

        const container = new Container();

        container.registerInstance(IdentityServiceSdkConfig, config);
        container.autoRegister(HttpClient);

        DiContainerFactory._registerUseCases(container);

    }

    static _registerUseCases(container) {

        container.autoRegister(GetUserInfoUseCase);
        container.autoRegister(RefreshAccessTokenUseCase);

    }

}
