module.exports = function (config) {
    config.set({
            frameworks: ['jspm', 'jasmine', 'phantomjs-shim'],
            reporters: ['spec', 'junit'],
            junitReporter: {
                outputDir:'test-reports'
            },
            jspm: {
                loadFiles: ['src/**/*.ts','test/**/*.ts']
            },
            browsers: ['PhantomJS'],
            singleRun: true
        }
    );
};