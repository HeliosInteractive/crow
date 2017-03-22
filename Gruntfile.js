module.exports = function( grunt ) {
  "use strict";

  var pkg = require("./package.json");

  var banner = `(function(factory) {
    
    // Establish the root object, window (self) in the browser, or global on the server.
    // We use self instead of window for WebWorker support.
    var root = (typeof self == 'object' && self.self === self && self) ||
        (typeof module == 'object' && module);

    // Set up crow appropriately for the environment. Start with AMD.
    if (typeof define === 'function' && define.amd) {
      define('crow', ['exports'], function(exports) {
        // Export global even in AMD case in case this script is loaded with
        // others that may still expect a global crow.
        root.crow = factory();
        // return crow for correct AMD use
        return root.crow;
      });

      // Next for Node.js or CommonJS.
    } else if (typeof exports !== 'undefined') {
        root.exports = factory();
      // Finally, as a browser global.
    } else {
      root.crow = factory();
    }

  })(function() {
  `;

  var footer = `
    return crow;
  });`;

  

  grunt.initConfig({
    connect: {
      test: {
        options: {
          port: 8000,
          hostname: '*'
        }
      }
    },
    uglify: {
      options: {
        mangle: false,
        beautify: true,
        "indent-level" : 2,
        width : 120,
        semicolons: false,
        quote_style: 1,
        wrap: false,
        banner: "/*Crow Client v"+pkg.version+"*/\n" + banner,
        footer: footer
      },
      crow: {
        options: {
        },
        files: {
          'dist/crow.js': ['./lib/merge.js','./lib/image.js','./lib/request.js', 'index.js']
        }
      },
      crowmodule: {
        options: {
          banner: "/*Crow Client ES6 Module v"+pkg.version+"*/\nexport var crow = (function() {\n ",
          footer:`
    return crow;
  })();`
        },
        files: {
          'dist/crow.module.js': ['./lib/merge.js','./lib/image.js','./lib/request.js', 'index.js']
        }
      },
      crowmin: {
        options: {
          drop_console: true,
          mangle: true,
          beautify: false
        },
        files: {
          'dist/crow.min.js': ['./lib/request.js', 'index.js']
        }
      }
    },
    jshint: {
      all: {
        src: [
          "index.js", "lib/**/*.js"
        ],
        options: {
          jshintrc: true
        }
      }
    },
    mochaTest: {
      test: {
        options: {
          reporter: 'spec',
          quiet: false,
          clearRequireCache: false
        },
        src: ['test/**/*.js']
      }
    },
    watch: {
      files: [ "<%= jshint.all.src %>" ],
      tasks: [ "jshint:all", "uglify:crow" ]
    }
  });

  // Load grunt tasks from NPM packages
  require( "load-grunt-tasks" )( grunt );

  grunt.registerTask("dev", ["connect", "watch"]);

  grunt.registerTask( "build", [ "jshint:all", "uglify" ] );

  grunt.registerTask( "lint", [ "jshint:all" ] );

  grunt.registerTask( "default", [ "build" ] );
};