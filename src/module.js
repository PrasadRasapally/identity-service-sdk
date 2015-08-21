import angular from "angular";
import configProvider from "./config.provider";
import factory from "./factory";
import getUserInfoUseCaseFactory from "./getUserInfoUseCase.service.js";
import refreshAccessTokenUseCaseFactory from "./refreshAccessTokenUseCase.service.js";

angular
    .module(
    "identityServiceSdk.module",
    [])
    .provider("identityServiceSdk.config", configProvider)
    .factory("identityServiceSdk", factory)
    .service("identityServiceSdk.getUserInfoUseCase", getUserInfoUseCaseFactory)
    .service("identityServiceSdk.refreshAccessTokenUseCase", refreshAccessTokenUseCaseFactory);