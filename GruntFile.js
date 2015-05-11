module.exports = function (grunt) {
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.initConfig({
        concat:{
            dist: {
                src: ['src/*.js'],
                dest: 'dist/identity-service-angularjs-sdk.js'
            }
        }
    });
    grunt.registerTask('default', ['concat']);
};