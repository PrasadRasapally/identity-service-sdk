module.exports = function (config) {
    config.set({
            frameworks: ['jspm', 'jasmine'],
            reporters: ["spec"],
            jspm: {
                loadFiles: ['test/**/*.js'],
                serveFiles: ['src/**/*.js']
            },
            browsers: ['Chrome'],
            singleRun: true
        }
    );
};