// Utility class for the application
define(["jquery"], function ($) {

		return {
			// root location of the templates
			templateDir: "app/templates/",
			
			// Get, compile and render a template to a specified element
			// location of template, data to include, location to render to
			renderTemplate: function (templateLocation, data, location) {
				data = typeof data !== 'undefined' ? data : {};
				location = typeof data !== 'undefined' ? location : $("#content")[0];
				var template = "doT!" + this.templateDir + templateLocation
				require([template], function(tmpl) {
					$(location).html(tmpl(data));
				})
			}
		}
});