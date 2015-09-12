module.exports = function (config) {

    if (!process.env.SAUCE_USERNAME) {
        console.log('SAUCE_USERNAME not set');
        process.exit(1);
    } else if (!process.env.SAUCE_ACCESS_KEY) {
        console.log('SAUCE_ACCESS_KEY not set');
        process.exit(1);
    }

    const customLaunchers = {
        sl_chrome: {
            base: 'SauceLabs',
            browserName: 'chrome',
            platform: 'Windows 7',
            version: 35
        }
    };

    config.set({
            frameworks: ['jspm', 'jasmine'],
            reporters: ['spec', 'junit'],
            junitReporter: {
                outputDir: 'test-reports'
            },
            jspm: {
                loadFiles: ['src/**/*.js', 'test/**/*.js']
            },
            browserNoActivityTimeout: 60000,
            customLaunchers: customLaunchers,
            browsers: Object.keys(customLaunchers),
            singleRun: true
        }
    );
};
