module.exports = function (config) {
    config.set({
            frameworks: ['jspm', 'jasmine'],
            jspm: {
                loadFiles: ['test/**/*.js'],
                serveFiles: ['src/**/*.js']
            },
            browsers: ['Chrome'],
            singleRun: true
        }
    );
};