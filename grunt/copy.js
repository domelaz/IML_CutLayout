"use strict";

const path = require("path");

const src = process.env.NODE_ENV === "development" ? [".debug"] : [];

module.exports = {
  /**
   * "Доукомплектация" dist
   */
  extension: {
    expand: true,
    cwd: path.join(__dirname, "..", "<%= extSrc %>"),
    src: src.concat([
      "CSXS/**",
    ]),
    dest: path.join(__dirname, "..", "<%= dist %>")
  },

  /**
   * Копирование расширения куда надо
   * @see https://github.com/Adobe-CEP/CEP-Resources/wiki/CEP-6-HTML-Extension-Cookbook-for-CC-2015#where-are-the-extensions
   *
   * Аналог exec:sync для Windows
   */
  deploy: {
    expand: true,
    cwd: path.join(__dirname, "..", "<%= dist %>"),
    src: src.concat([
      "<%= cepDstPath %>/**",
      "CSXS/**",
      "jsx/**",
      "index.html",
    ]),
    dest: path.join(process.env.APPDATA || "/tmp/", "Adobe/CEP/extensions", "<%= pkg.name %>")
  }
};
