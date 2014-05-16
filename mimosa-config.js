exports.config = {
	watch: {
		sourceDir:"src",
		compiledDir: "public",
		javascriptDir: "assets/js"
	},
	"modules": [
		"copy",
		"jshint",
		"csslint",
		"server",
		"require",
		"minify-js",
		"minify-css",
		"live-reload",
		"bower"
	]
}