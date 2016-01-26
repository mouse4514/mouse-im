module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
      //压缩javascript代码
    uglify: {
        options: {
            banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'//添加banner
        },
        ctrl: {//任务四：合并压缩a.js和b.js
            files: {
                'js/ctrl.min.js': ['js/ctrl.js']
            }
        },
        model: {//任务四：合并压缩a.js和b.js
            files: {
                'js/model.min.js': ['js/model.js']
            }
        },
        config:{
            files:{
                'js/dist/config.min.js':['js/libs/config.js']
            }
        }
    },
      //合并多个文件的代码到一个文件中
    concat: {
	   ctrl: {
	        src: ['controller/*.js'],
	        dest: 'js/libs/ctrl.js'
       },
	    model: {
	        src: ['model/*.js'],
	        dest: 'js/model/model.js'
	    },
        config:{
            src: ['./config/*.js'],
            dest: 'js/libs/config.js'
        },
        angular:{
            src: ['./js/angular-1.2.19/*.js'],
            dest: 'js/libs/angular-1.2.19.min.js'
        }

      },
     //javascript语法错误检查
      jshint: {
          build: ['js/ctrl.js','js/model.js'],
          options: {
             jshintrc:'.jshintrc'
              }
      },
      //实时监控文件变化、调用相应的任务重新执行
      watch : {
          options: {
              livereload: 35729 // this port must be same with the connect livereload port
          },
          scripts: {
              options: {
                  livereload: true
              },
　　　　　　　　//所有文件发生改变都执行自动reload
              files : ['./config/*.js'],
              tasks : ['concatconfig','minconfig']
          }
      }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  //grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');
  // Default task(s).
  grunt.registerTask('default', ['watch']);
//默认任务
//  grunt.registerTask('default', ['uglify:release']);
  grunt.registerTask('minctrl', ['uglify:ctrl']);
  grunt.registerTask('minmodel', ['uglify:model']);
    grunt.registerTask('minconfig', ['uglify:config']);
  grunt.registerTask('concatctrl', ['concat:ctrl']);
  grunt.registerTask('concatmodel', ['concat:model']);
    grunt.registerTask('concatconfig', ['concat:config']);
    grunt.registerTask('concatangular', ['concat:angular']);
  

};