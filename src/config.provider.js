function configProvider() {

    var objectUnderConstruction = {
        setBaseUrl: setBaseUrl,
        $get: $get
    };

    return objectUnderConstruction;

    function setBaseUrl(baseUrl) {
        objectUnderConstruction.baseUrl = baseUrl;
        return objectUnderConstruction;
    }

    function $get() {
        return {
            baseUrl: objectUnderConstruction.baseUrl
        };

    }
}

export default configProvider;