// Utility class for the application
define(["jquery"], function ($) {

		return {
			// root location of the templates
			imageDir:	"assets/img/",
			templateDir: "app/templates/",
			markdownDir: "app/markdown/",
			
			// presets
			seedUid: Math.floor(Math.random()*100001),
			getNextUid: function() {
				return this.seedUid += 1
			},
			
			//--//--//-//--//--//--//
			// Helper Functions 	 //
			//--//--//-//--//--//--//
			
			// Prepare the data to be sent to the templates.
			// includes this util as part of the package.
			packageData: function(payload) {
				payload = typeof payload !== 'undefined' ? payload : {};
				// never repackage if it has already been packaged
				// this is to handle being passed around within templates
				if (typeof payload.packaged !== 'undefined' && typeof payload.data !== 'undefined' && typeof payload.util !== 'undefined') {
					return payload
				} else {
					return {
						packaged: true,
						data: payload,
						util: this
					}
				}
			},
			
			// Stringify state and store it in localStorage
			saveCurrentDataToSession: function (data, name) {
				sessionStorage.setItem(name, JSON.stringify(data));
			},
			
			// Load state from localStorage and restore functionality
			loadDataFromSession: function (name, additionalComponents) {
				var storedData = JSON.parse(sessionStorage.getItem(name));
				storedData.util = this;
				return storedData;
			},
			
			//--//--//--//--//--//
			// Render Functions //
			//--//--//--//--//--//
			
			// Get, compile and render a template to a specified element
			// location of template, data to include, location to render to
			renderTemplate: function (templateLocation, data, location) {
				data = this.packageData(data);
				location = typeof data !== 'undefined' ? location : $("#content")[0];
				var template = "doT!" + this.templateDir + templateLocation
				require([template], function(tmpl) {
					$(location).html(tmpl(data));
				})
			},
			
			// Render a markdown file to a specified element
			renderMarkdown: function (markdownLocation, location) {
				data = this.packageData();
				location = typeof data !== 'undefined' ? location : $("#content")[0];
				var markdown = "mdown!" + this.markdownDir + markdownLocation
				require([markdown], function(md) {
					$(location).html(md);
				})
			},
			
			//--//--//--//--//--//--//--//
			// DOM Generation Functions //
			//--//--//--//--//--//--//--//
			
			//just expose the current 
			domForExposingCurrentData: function (dataName) {
				dataName = typeof dataName !== 'undefined' ? dataName : "it";
				script = $('<script>var '+dataName+' = {}; require(["app/util"], function(util) { '+dataName+' = util.loadDataFromSession("'+dataName+'"); });</script>');
				return $(script)[0].outerHTML;
			},
			
			// Generate a lazy loading for the image
			domForImage: function (imageLocation, width, height, uid) {
				uid = typeof uid !== 'undefined' ? uid : this.getNextUid();
				var image = "image!" + this.imageDir + imageLocation;
				var id = "img-" + imageLocation.split('/').join('-').split('.')[0] + "-" + uid;
				var domWrapper = $('<div id="'+id+'"></div>');
				
				// Handle custom width requirents for the loaded image
				var customWidthScript = "";
				if (typeof width !== 'undefined') { customWidthScript = "$(image).width("+width+");" }
				var customHeightScript = "";
				if (typeof height !== 'undefined') { customHeightScript = "$(image).height("+height+");" }
				
				var script = $('<script>require(["'+image+'","jquery"], function(image, $) {$("#'+id+'").each( function() {'+customWidthScript+customHeightScript+' $(this).append(image); })});</script>');
				domWrapper.append(script);
				return $(domWrapper)[0].outerHTML;
			},
			
			// Generate a button that dynamically changes the content
			// to the requested template
			domForTemplateButton: function (templateLocation, data, buttonText, cssClass, renderLocation, uid) {
				buttonText = typeof buttonText !== 'undefined' ? buttonText : templateLocation;
				cssClass = typeof cssClass !== 'undefined' ? cssClass : "button";
				renderLocation = typeof renderLocation !== 'undefined' ? renderLocation : $("#content")[0]
				uid = typeof uid !== 'undefined' ? uid : this.getNextUid();
				var id = "tmpl-" + imageLocation.split('/').join('-').split('.')[0] + "-" + uid;
				var domWrapper = $('<div id="'+id+'"></div>');
				
				$(domWrapper).append('<button class="'+cssClass+'">'+buttonText+'</button>')
				
				return $(domWrapper)[0].outerHTML;
			}
		}
});