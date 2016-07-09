"use strict";

module.exports = function(grunt) {
  require("load-grunt-config")(grunt, {
    data: {
      ccVersion: "6",

      /**
       * Root of CEP extension ready for deploy
       */
      dist: "dist",

      /**
       * Illustrator-side sources and destination
       */
      ilstSrc: "src/host/",
      ilstDstPath: "jsx",
      ilstDstName: "hostscript.jsx",

      /**
       * Browser-side sources and destination
       */
      cepSrc: "src/panel/",
      cepDstPath: "assets",
      cepDstName: "scripts.js",

      /**
       * Static extenstion sources
       */
      extSrc: "src/extension/",

      pkg: grunt.file.readJSON("package.json"),
    }
  });

  grunt.registerTask("gitrev", "Inject latest commit hash", function() {
    const done = this.async();
    grunt.util.spawn({
      cmd: "git",
      args: ["log", "-1", "--pretty=%h"],
      fallback: "",
    }, function(err, result) {
      grunt.config.data.gitrev = result.stdout;
      done();
    });
  });

  grunt.registerTask("default", ["postcss", "less", "pug", "webpack", "copy"]);
  grunt.registerTask("installer", ["clean", "default", "gitrev", "exec:installer"]);
};
