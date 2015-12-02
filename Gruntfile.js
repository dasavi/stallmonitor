module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt);
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        eslint: {
            options: {
                configFile: '.eslintrc.json',
                reset: true
            },
            target: ['stallmonitor/js/modules/**/*.js']
        },
        sass: {
            dist: {
                files: {
                    'stallmonitor/css/master.css' : 'stallmonitor/css/scss/master.scss'
                }
            }
        },
        watch: {
            css: {
                files: '**/*.scss',
                tasks: ['sass']
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.registerTask('default', ['watch']);
    grunt.registerTask('dev', ['eslint', 'watch']);
    grunt.registerTask('dev', ['eslint', 'watch']);
};