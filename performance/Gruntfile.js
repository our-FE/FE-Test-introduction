module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    phantomas: {
      default: {
        options: {
          indexPath: './163.com/',
          options: {},
          url: 'http://mail.163.com/'
        }
      },
      screenshot: {
        options: {
          indexPath: './163.com/',
          options: {
            'screenshot': 'screenshots/sample-' + Date.now() + '.png'
          },
          url: 'http://mail.163.com/'
        }
      },
      requests: {
        options: {
          indexPath: './163.com/',
          options: {
            'assert-requests': 20
          },
          url: 'http://mail.163.com/'
        }
      },
    }
  });
  grunt.loadNpmTasks('grunt-phantomas');
  grunt.registerTask('default', ['phantomas:default']);
};
