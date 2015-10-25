module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    bower_concat: {
      all: {
        dest: './public/javascripts/lib.min.js',
        cssDest: './public/stylesheets/lib.min.css',
      },
    },
    less: {
      all: {
        options: {
          compress: true,
        },
        files: {
          "./public/stylesheets/style.css": "./public/stylesheets/style.less"
        }
      }
    },
    browserify: {
      dist: {
        files: {
          './public/javascripts/clientws.js': ['./client-src/clientws.js']
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-bower-concat');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-browserify');

  grunt.registerTask('default', ['bower_concat', 'less', 'browserify']);
};
