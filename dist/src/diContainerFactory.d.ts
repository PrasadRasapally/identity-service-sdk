import { Container } from 'aurelia-dependency-injection';
import { IdentityServiceSdkConfig } from './identityServiceSdkConfig';
/**
 * @class DiContainerFactory
 * @constructor
 */
export default class DiContainerFactory {
    private _config;
    constructor(config: IdentityServiceSdkConfig);
    /**
     *
     * @returns {Container} dependency injection container
     */
    construct(): Container;
    private static _registerUseCases(container);
}
