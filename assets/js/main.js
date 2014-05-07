//Require Configuration
require.config({
  baseUrl: "assets/js",
  // Break caching (DEVELOPMENTAL SETTING)
  urlArgs: "bust=" + (new Date()).getTime(),
  //Shim for non AMD libraries
  shim: {
    underscore: {
      exports: '_'
    },
    backbone: {
      deps: ["underscore", "jquery"],
      exports: "Backbone"
    },
    bootstrap: {
      deps: ["jquery"]
    }
  },
  paths: {
      // Library Specific Paths
      "backbone":     "lib/backbonejs/backbone-min", // Version:
      "underscore":   "lib/underscorejs/underscore-min", // Version:
      "jquery":       "lib/jQuery/jQuery", // Version:
      "bootstrap":    "lib/bootstrap/bootstrap.min", // Version:
      "doTCompiler":  "lib/doT/doT", // Version:
      "text":         "lib/requirejs-text/text", // Version:
      "doT":          "lib/requirejs-doT/doT" // Version:
  },
  doT: {
    ext: '.dot', // extension of the templates, defaults to .dot
    templateSettings: {
      evaluate:    /\{\{([\s\S]+?)\}\}/g,
      interpolate: /\{\{=([\s\S]+?)\}\}/g,
      encode:      /\{\{!([\s\S]+?)\}\}/g,
      use:         /\{\{#([\s\S]+?)\}\}/g,
      define:      /\{\{##\s*([\w\.$]+)\s*(\:|=)([\s\S]+?)#\}\}/g,
      conditional: /\{\{\?(\?)?\s*([\s\S]*?)\s*\}\}/g,
      iterate:     /\{\{~\s*(?:\}\}|([\s\S]+?)\s*\:\s*([\w$]+)\s*(?:\:\s*([\w$]+))?\s*\}\})/g,
      varname: 'it',
      strip: true,
      append: true,
      selfcontained: false
    }
  },
  waitSeconds: 15
});

//Kickstart the app
//Loads libraries as required and even shims things nicely
require(["app/app"], function(app) {
  app.init()
});