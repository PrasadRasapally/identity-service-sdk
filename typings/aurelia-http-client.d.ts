declare module 'aurelia-http-client/request-builder' {
    /**
     * A builder class allowing fluent composition of HTTP requests.
     *
     * @class RequestBuilder
     * @constructor
     */
    export class RequestBuilder {
        client: any;
        transformers: any;
        useJsonp: any;
        constructor(client: any);
        /**
         * Adds a user-defined request transformer to the RequestBuilder.
         *
         * @method addHelper
         * @param {string} name The name of the helper to add.
         * @param {Function} fn The helper function.
         * @chainable
         */
        static addHelper(name: any, fn: any): void;
        /**
         * Sends the request.
         *
         * @method send
         * @return {Promise} A cancellable promise object.
         */
        send(): any;


        asDelete():RequestBuilder;
        asGet():RequestBuilder;
        asHead():RequestBuilder;
        asOptions():RequestBuilder;
        asPatch():RequestBuilder;
        asPost():RequestBuilder;
        asPut():RequestBuilder;
        asJsonp():RequestBuilder;
        withUrl(url:any):RequestBuilder;
        withContent(content:any):RequestBuilder;
        withBaseUrl(baseUrl:any):RequestBuilder;
        withParams(params:any):RequestBuilder;
        withResponseType(responseType:any):RequestBuilder;
        withTimeout(timeout:any):RequestBuilder;
        withHeader(key:any,value:any):RequestBuilder;
        withCredentials(value:any):RequestBuilder;
        withReviver(reviver:any):RequestBuilder;
        withReplacer(replacer:any):RequestBuilder;
        withProgressCallback(progressCallback:any):RequestBuilder;
        withCallbackParameterName(callbackParameterName:any):RequestBuilder;
    }

}
