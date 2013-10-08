module.exports = (grunt) ->

  grunt.task.loadNpmTasks 'grunt-contrib-concat'
  grunt.task.loadNpmTasks 'grunt-contrib-uglify'

  grunt.initConfig
    pkg: grunt.file.readJSON('package.json')

    banner: """
/*! <%= pkg.name %> (<%= pkg.repository.url %>)
* <%= pkg.description %>
 * lastupdate: <%= grunt.template.today("yyyy-mm-dd") %>
 * version: <%= pkg.version %>
 * author: <%= pkg.author %>
 * License: MIT
 */

"""

    concat:
      main:
        options:
          banner: '<%= banner %>'
        files: [
          'dest/jquery.stopcrack.js': 'src/jquery.stopcrack.js'
        ]

    uglify:
      main:
        options:
          banner: '<%= banner %>'
        files: [
          'dest/jquery.stopcrack.min.js': 'src/jquery.stopcrack.js'
        ]


  grunt.registerTask 'build', [
    'concat'
    'uglify'
  ]

  grunt.registerTask 'default', [
    'build'
  ]
