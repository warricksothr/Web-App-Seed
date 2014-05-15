/*global require*/
'use strict';

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
        backboneLocalstorage: {
						deps: ['backbone'],
						exports: 'Store'
        },
        bootstrap: {
            deps: ["jquery"]
        }
    },
    paths: {
        // Library Specific Paths
        // First load from CDN if available, then fallback to local copies
        "backbone": ["//cdnjs.cloudflare.com/ajax/libs/backbone.js/1.1.2/backbone-min", "lib/backbonejs/backbone-min"], // Version: 1.1.2 From: http://backbonejs.org/
				"backboneLocalStorage": ['lib/backbonejs-localStorage/backbone.localStorage.min'], //Version: 1.1.7 From: https://github.com/jeromegn/Backbone.localStorage
        "underscore": ["//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.6.0/underscore-min", "lib/underscorejs/underscore-min"], // Version: 1.6.0 From: http://underscorejs.org/
        "jquery": ["//cdnjs.cloudflare.com/ajax/libs/jquery/2.1.1/jquery.min", "lib/jQuery/jQuery"], // Version: 2.1.1 From: http://jquery.com/
        "bootstrap": ["//cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.1.1/js/bootstrap.min", "lib/bootstrap/bootstrap.min"], // Version: 3.1.1 From: http://getbootstrap.com/
        "doTCompiler": ["lib/doT/doT"], // Version: 1.0.0 From: http://olado.github.io/doT/index.html
        "text": ["//cdnjs.cloudflare.com/ajax/libs/require-text/2.0.10/text", "lib/requirejs/text"], // Version: 2.0.10 From: https://github.com/requirejs/text
        "doT": ["lib/requirejs/doT"], // Version: 0.1.2. From: https://github.com/ullmark/requirejs-doT
				"propertyParser": ["lib/requirejs/propertyParser"], // Version: 0.1.0 From: https://github.com/millermedeiros/requirejs-plugins
				"mdown": ["lib/requirejs/mdown"], // Version: 0.1.1 From: https://github.com/millermedeiros/requirejs-plugins
				"markdownConverter": ["lib/markdown.converter/Markdown.Converter"], // Version: ? From: https://github.com/millermedeiros/requirejs-plugins
				"noext": ["lib/requirejs/noext"], // Version: 0.3.1 From: https://github.com/millermedeiros/requirejs-plugins
				"json": ["lib/requirejs/json"], // Version: 0.4.0 From: https://github.com/millermedeiros/requirejs-plugins
				"image": ["lib/requirejs/image"], // Version: 0.2.2 From: https://github.com/millermedeiros/requirejs-plugins
				"font": ["lib/requirejs/font"] // Version: 0.2.0 From: https://github.com/millermedeiros/requirejs-plugins
    },
    doT: {
        ext: '.dot', // extension of the templates, defaults to .dot
        templateSettings: {
            evaluate: /\{\{([\s\S]+?)\}\}/g,
            interpolate: /\{\{=([\s\S]+?)\}\}/g,
            encode: /\{\{!([\s\S]+?)\}\}/g,
            use: /\{\{#([\s\S]+?)\}\}/g,
            define: /\{\{##\s*([\w\.$]+)\s*(\:|=)([\s\S]+?)#\}\}/g,
            conditional: /\{\{\?(\?)?\s*([\s\S]*?)\s*\}\}/g,
            iterate: /\{\{~\s*(?:\}\}|([\s\S]+?)\s*\:\s*([\w$]+)\s*(?:\:\s*([\w$]+))?\s*\}\})/g,
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
require(["app/app"], function (app) {
    app.init();
});