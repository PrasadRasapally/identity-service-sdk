import angular from 'angular';
import configProvider from './config.provider';
import service from './service';
import getUserInfoUseCaseFactory from './getUserInfoUseCase.service.js';
import refreshAccessTokenUseCaseFactory from './refreshAccessTokenUseCase.service.js';

const identityServiceSdk =
    angular
        .module(
        'identityServiceSdk.module',
        [])
        .provider('identityServiceSdk.config', configProvider)
        .service('identityServiceSdk', service)
        .service('identityServiceSdk.getUserInfoUseCase', getUserInfoUseCaseFactory)
        .service('identityServiceSdk.refreshAccessTokenUseCase', refreshAccessTokenUseCaseFactory);

export default identityServiceSdk;