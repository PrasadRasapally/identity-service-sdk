module.exports = function (config) {
    config.set({
            frameworks: ['jspm', 'jasmine', 'phantomjs-shim'],
            reporters: ['spec', 'junit'],
            junitReporter: {
                outputDir:'test-reports'
            },
            jspm: {
                loadFiles: ['test/**/*.js'],
                serveFiles: ['src/**/*.ts']
            },
            browsers: ['PhantomJS'],
            singleRun: true
        }
    );
};