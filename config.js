System.config({
    defaultJSExtensions: true,
    transpiler: "typescript",
    paths: {
        "github:*": "jspm_packages/github/*",
        "npm:*": "jspm_packages/npm/*"
    },
    typescriptOptions: {
        emitDecoratorMetadata: true
    },
    packages: {
        "src": {
            "defaultExtension": "ts"
        }
    },
    map: {
        "aurelia-dependency-injection": "github:aurelia/dependency-injection@0.9.2",
        "aurelia-http-client": "github:aurelia/http-client@0.10.3",
        "core-js": "npm:core-js@1.1.1",
        "typescript": "npm:typescript@1.5.3",
        "github:aurelia/dependency-injection@0.9.2": {
            "aurelia-logging": "github:aurelia/logging@0.6.4",
            "aurelia-metadata": "github:aurelia/metadata@0.7.3",
            "core-js": "npm:core-js@0.9.18"
        },
        "github:aurelia/http-client@0.10.3": {
            "aurelia-path": "github:aurelia/path@0.8.1",
            "core-js": "npm:core-js@0.9.18"
        },
        "github:aurelia/metadata@0.7.3": {
            "core-js": "npm:core-js@0.9.18"
        },
        "github:jspm/nodelibs-buffer@0.1.0": {
            "buffer": "npm:buffer@3.4.3"
        },
        "github:jspm/nodelibs-os@0.1.0": {
            "os-browserify": "npm:os-browserify@0.1.2"
        },
        "github:jspm/nodelibs-path@0.1.0": {
            "path-browserify": "npm:path-browserify@0.0.0"
        },
        "github:jspm/nodelibs-process@0.1.1": {
            "process": "npm:process@0.10.1"
        },
        "npm:buffer@3.4.3": {
            "base64-js": "npm:base64-js@0.0.8",
            "ieee754": "npm:ieee754@1.1.6",
            "is-array": "npm:is-array@1.0.1"
        },
        "npm:core-js@0.9.18": {
            "fs": "github:jspm/nodelibs-fs@0.1.2",
            "process": "github:jspm/nodelibs-process@0.1.1",
            "systemjs-json": "github:systemjs/plugin-json@0.1.0"
        },
        "npm:core-js@1.1.1": {
            "fs": "github:jspm/nodelibs-fs@0.1.2",
            "process": "github:jspm/nodelibs-process@0.1.1",
            "systemjs-json": "github:systemjs/plugin-json@0.1.0"
        },
        "npm:os-browserify@0.1.2": {
            "os": "github:jspm/nodelibs-os@0.1.0"
        },
        "npm:path-browserify@0.0.0": {
            "process": "github:jspm/nodelibs-process@0.1.1"
        },
        "npm:typescript@1.5.3": {
            "buffer": "github:jspm/nodelibs-buffer@0.1.0",
            "child_process": "github:jspm/nodelibs-child_process@0.1.0",
            "fs": "github:jspm/nodelibs-fs@0.1.2",
            "os": "github:jspm/nodelibs-os@0.1.0",
            "path": "github:jspm/nodelibs-path@0.1.0",
            "process": "github:jspm/nodelibs-process@0.1.1",
            "readline": "github:jspm/nodelibs-readline@0.1.0"
        }
    }
});
