module.exports = function (config) {
    config.set({
            frameworks: ['jspm', 'jasmine', 'phantomjs-shim'],
            reporters: ['spec', 'junit'],
            junitReporter: {
                outputDir:'test-reports'
            },
            jspm: {
                loadFiles: ['dist/**/*.js']
            },
            browsers: ['PhantomJS'],
            singleRun: true
        }
    );
};
