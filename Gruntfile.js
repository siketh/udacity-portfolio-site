module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);

  var config = grunt.file.readYAML('Gruntconfig.yml');
  var pkg = grunt.file.readJSON('package.json');

  grunt.initConfig({
    clean: ['build', 'dist'],
    jshint: {
      files: ['Gruntfile.js', config.jsSrcDir + '**/*.js'],
    },
    concat: {
      scss: {
        src: [config.scssSrcDir + '**/*.scss'],
        dest: config.scssBuildDir + pkg.name + '.scss'
      },
      js: {
        src: [config.jsSrcDir + '**/*.js'],
        dest: config.jsBuildDir + pkg.name + '.js'
      }
    },
    htmlmin: {
      options: {
        removeComments: true,
        collapseWhitespace: true
      },
      dist: {
        expand: true,
        cwd: config.htmlSrcDir,
        src: '**/*.html',
        dest: config.htmlDistDir,
      }
    },
    sass: {
      dist: {
        src: config.scssBuildDir + pkg.name + '.scss',
        dest: config.cssDistDir + pkg.name + '.css'
      }
    },
    uglify: {
      dist: {
        src: config.jsBuildDir + pkg.name + '.js',
        dest: config.jsDistDir + pkg.name + '.js'
      }
    },
    copy: {
      dist: {
        expand: true,
        cwd: config.imagesSrcDir,
        src: '**',
        dest: config.imagesDistDir,
        flatten: true,
        filter: 'isFile',
      },
    },
    watch: {
      scripts: {
        files: ['Gruntfile.js', config.jsSrcDir + '**/*.js', config.htmlSrcDir + '**/*.html',
          config.scssSrcDir + '**/*.scss'
        ],
        tasks: ['clean', 'jshint', 'concat', 'htmlmin',
          'sass', 'uglify', 'copy'
        ],
        options: {
          spawn: false,
        }
      }
    }
  });

  grunt.registerTask('default', ['clean', 'jshint', 'concat', 'htmlmin',
    'sass', 'uglify', 'copy', 'watch'
  ]);
};
