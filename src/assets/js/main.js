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
        backboneLocalStorage: {
			deps: ['backbone'],
			exports: 'Store'
        },
        bootstrap: {
            deps: ["jquery"]
        }
    },
    paths: {
        // Library Specific Paths
        "backbone": ["lib/backbone/backbone"],
		"backboneLocalStorage": ['lib/backbone.localStorage/backbone.localStorage'],
        "underscore": ["lib/underscore/underscore"],
        "jquery": ["lib/jquery/jquery"],
        "bootstrap": ["lib/bootstrap/bootstrap"],
        "doTCompiler": ["lib/doT/doT"],
        "text": ["lib/requirejs-text/text"],
        "doT": ["lib/requirejs-doT/doT"],
		"propertyParser": ["lib/requirejs-plugins/propertyParser"],
		"mdown": ["lib/requirejs-plugins/mdown"],
		"markdownConverter": ["lib/requirejs-plugins/Markdown.Converter"],
		"noext": ["lib/requirejs-plugins/noext"],
		"json": ["lib/requirejs-plugins/json"],
		"image": ["lib/requirejs-plugins/image"],
		"font": ["lib/requirejs-plugins/font"]
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