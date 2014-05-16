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
	"modules": [
		"copy",
		"jshint",
		"csslint",
		"require",
		"minify-js",
		"minify-css",
		"live-reload",
		"bower"
	]
}