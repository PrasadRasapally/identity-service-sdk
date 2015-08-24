module.exports = function (config) {
    config.set({
            frameworks: ['jspm', 'jasmine','phantomjs-shim'],
            reporters: ["spec"],
            jspm: {
                loadFiles: ['test/**/*.js'],
                serveFiles: ['src/**/*.js']
            },
            browsers: ['PhantomJS'],
            singleRun: true
        }
    );
};