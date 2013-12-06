module.exports = (grunt) ->
  grunt.initConfig
    pkg: grunt.file.readJSON('package.json')
    bower: gh:
      options:
        layout: "byComponent"
    stylus: gh: files:
      'lib/index.css': 'src/index.styl'
    cssmin: gh: files:
      'lib/combined.css': ['lib/bootstrap/css/bootstrap.css', 'lib/bootstrap/css/bootstrap-theme.css', 'lib/index.css']
    coffee: gh: files:
      'lib/controller.js': 'src/*.coffee'
    ngmin: controllers:
      src: 'lib/controller.js'
      dest: 'lib/controller.ngmin.js'
    uglify: gh: files:
      'lib/combined.js': [
        'lib/sugar/sugar.min.js',
        'lib/showdown/src/showdown.js',
        'lib/jquery/jquery.js',
        'lib/bootstrap/js/bootstrap.js',
        'lib/angular/angular.js',
        'lib/angular-sanitize/angular-sanitize.js',
        'lib/lunr.js/lunr.js',
        'lib/controller.ngmin.js'
      ]
    jade: gh: files:
      'lib/index.html': 'src/index.jade'
    combopage: gh: files:
      'dist/index.html': ['lib/index.html']
    "gh-pages":
      options:
        base: 'dist'
        branch: 'master'
      src: '*'

  grunt.loadNpmTasks(task) for task in [
    'grunt-bower-task'
    'grunt-contrib-cssmin'
    'grunt-contrib-coffee'
    'grunt-ngmin'
    'grunt-contrib-uglify'
    'grunt-contrib-stylus'
    'grunt-contrib-jade'
    'grunt-combopage'
    'grunt-gh-pages'
  ]

  grunt.registerTask 'default', ['bower', 'stylus', 'cssmin', 'coffee', 'ngmin', 'uglify', 'jade', 'combopage']
