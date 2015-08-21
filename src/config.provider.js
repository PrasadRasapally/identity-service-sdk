class ConfigProvider {

    constructor() {
        this._baseUrl = null;
    }

    set baseUrl(value) {
        this._baseUrl = value;
    }

    $get() {
        return {
            baseUrl: this._baseUrl
        };
    }
}

export default ConfigProvider;