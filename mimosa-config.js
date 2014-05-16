exports.config = {
	watch: {
		sourceDir:"src",
		compiledDir: "public",
		javascriptDir: "assets/js"
	},
	vendor: {
		javascripts: "assets/js/lib",
		stylesheets: "assets/css/lib"
	},
	copy: {
		//exclude: [/\/?(.)+-test.js/]
	},
	bower: {
		copy: {
			unknownMainFullCopy: false,
			mainOverrides: {
				"doT": ["doT.js"],
				"modernizr": ["modernizr.js"]
			}
		}
	},
	require: {
		optimize: {
			overrides: {
				mainConfigFile: "src/assets/js/main.js"
			}
		}
	},
	"modules": [
		"copy",
		"jshint",
		"csslint",
		"require",
		"minify-js",
		"minify-css",
		"live-reload",
		"bower",
		"testem-qunit",
		"require-lint",
		"plato",
		"js-validate",
		"dependency-graph"
	]
}