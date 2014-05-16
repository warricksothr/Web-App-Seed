exports.config = {
	"modules": [
		"copy",
		"jshint",
		"csslint",
		"require",
		"minify-js",
		"minify-css",
		"sass",
		"bower",
		"testem-qunit",
		"require-lint",
		"groundskeeper",
		"plato",
		"js-validate",
		"dependency-graph"
	],
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
}