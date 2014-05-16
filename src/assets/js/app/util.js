// Utility class for the application
define(["jquery"], function ($) {

		return {
			// root locations
			imageDir:	"assets/img/",
			templateDir: "app/templates/",
			markdownDir: "app/markdown/",
			
			// presets
			seedUid: Math.floor(Math.random()*100001),
			getNextUid: function() {
				return this.seedUid += 1;
			},
			
			//--//--//-//--//--//--//
			// Helper Functions    //
			//--//--//-//--//--//--//
			
			/**
			 * Prepare the data to be sent to the templates.
			 * includes this util as part of the package.
			 */
			packageData: function(payload) {
				payload = typeof payload !== 'undefined' ? payload : {};
				// never repackage if it has already been packaged
				// this is to handle being passed around within templates
				if (typeof payload.packaged !== 'undefined' && typeof payload.data !== 'undefined' && typeof payload.util !== 'undefined') {
					return payload;
				} else {
					return {
						packaged: true,
						data: payload,
						util: this
					};
				}
			},
			
			/**
			 * Stringify data and store it in localSession under a specified name
			 */
			saveDataToSession: function (data, name) {
				sessionStorage.setItem(name, JSON.stringify(data));
			},
			
			/**
			 * Load data from localSession and return it to the caller
			 */
			loadDataFromSession: function (name, additionalComponents) {
				var storedData = JSON.parse(sessionStorage.getItem(name));
				//Always reattach the util class for functionality
				var oldUtil = storedData.util;
				storedData.util = this;
				//Import carryover values from the old util into the new util
				storedData.util.seedUid = oldUtil.seedUid;
				return storedData;
			},
			
			/**
			 * Stringify data and store it in localSession under a specified name
			 */
			saveDataToLocalStorage: function (data, name) {
				localStorage.setItem(name, JSON.stringify(data));
			},
			
			/**
			 * Load data from localSession and return it to the caller
			 */
			loadDataFromLocalStorage: function (name, additionalComponents) {
				var storedData = JSON.parse(localStorage.getItem(name));
				//Always reattach the util class for functionality
				storedData.util = this;
				return storedData;
			},
			
			/**
			 * Exports the given object into the global context.
			 */
			exportGlobal: function(name, object, overwrite) {
				overwrite = typeof overwrite !== 'undefined' ? overwrite : false;
				if (typeof(window) !== "undefined") {
					// JS with GUI (usually browser)
					if (typeof window[name] === 'undefined' || overwrite === true) {
						window[name] = object;
					}
				}
				else {
						throw new Error("Unkown runtime environment. Currently only browsers are supported.");
				}
			},
			
			//--//--//--//--//--//
			// Render Functions //
			//--//--//--//--//--//
			
			/**
			 * Get, compile and render a template to a specified element
			 * location of template, data to include, location to render to
			 */
			renderTemplate: function (templateLocation, data, location) {
				data = this.packageData(data);
				location = typeof data !== 'undefined' ? location : $("#content")[0];
				var template = "doT!" + this.templateDir + templateLocation.trim();
				require([template], function(tmpl) {
					$(location).html(tmpl(data));
				});
			},
			/**
			 * Render a markdown file to a specified element
			 */
			renderMarkdown: function (markdownLocation, location) {
				var data = this.packageData();
				location = typeof data !== 'undefined' ? location : $("#content")[0];
				var markdown = "mdown!" + this.markdownDir + markdownLocation;
				require([markdown], function(md) {
					$(location).html(md);
				});
			},
			
			//--//--//--//--//--//--//--//
			// DOM Generation Functions //
			//--//--//--//--//--//--//--//
			
			/**
			 * dom for exposing the current data as a variable.
			 * @param dataName Name of the data varaiable in the template to expose to the browser
			 * @param varName The name that the data is stored in session as.
			 * @param overwrite The name to use for the variable
			 */
			domForExposingCurrentData: function (dataName, varName, overwrite) {
				overwrite = typeof overwrite !== 'undefined' ? overwrite : false;
				varName = typeof varName !== 'undefined' ? varName : "it";
				dataName = typeof dataName !== 'undefined' ? dataName : "it";
				var script = $('<script>require(["app/util"], function(util) { util.exportGlobal("'+varName+'",util.loadDataFromSession("'+dataName+'"),'+overwrite+'); });</script>');
				return $(script)[0].outerHTML;
			},
			
			/**
			 * Generate a lazy loading element and script for an image
			 */
			domForImage: function (imageLocation, width, height, uid) {
				uid = typeof uid !== 'undefined' ? uid : this.getNextUid();
				var image = "image!" + this.imageDir + imageLocation;
				var id = "img-" + imageLocation.split('/').join('-').split('.')[0] + "-" + uid;
				var domWrapper = $('<div id="'+id+'"></div>');
				
				// Handle custom width requirents for the loaded image
				var customWidthScript = "";
				if (typeof width !== 'undefined') { customWidthScript = "$(image).width("+width+");"; }
				var customHeightScript = "";
				if (typeof height !== 'undefined') { customHeightScript = "$(image).height("+height+");"; }
				
				var script = $('<script>require(["'+image+'","jquery"], function(image, $) {$("#'+id+'").each( function() {'+customWidthScript+customHeightScript+' $(this).append(image); })});</script>');
				domWrapper.append(script);
				return $(domWrapper)[0].outerHTML;
			},
			
			/**
			 * Generate a button that dynamically changes the content
			 * to the requested template
			 * @param templateLocation the location of the template under the template directory
			 * @param dataName the data to include in the rendering of the template
			 * @param buttonText The text that is written on the button for the user
			 * @param cssClass a specific style to apply to the button. Any valid CSS will work. (Optional)
			 * @param renderLocation The search descriptor or jQuery element where this template should be rendered. (Optional)
			 * @param uid a special identifier to help differentiate this item. (Optional)
			 */
			domForTemplateButton: function (templateLocation, dataName, buttonText, cssClass, renderLocation, uid) {
				buttonText = typeof buttonText !== 'undefined' ? buttonText : templateLocation;
				cssClass = typeof cssClass !== 'undefined' ? cssClass : "button";
				renderLocation = typeof renderLocation !== 'undefined' ? renderLocation : "#content";
				uid = typeof uid !== 'undefined' ? uid : this.getNextUid();
				var id = "tmpl-" + templateLocation.split('/').join('-').split('.')[0] + "-" + uid;
				var domWrapper = $('<div id="'+id+'"></div>');
				
				$(domWrapper).append('<button class="'+cssClass+'" onclick="'+dataName+'.util.renderTemplate(\''+templateLocation+'\','+dataName+',\''+renderLocation+'\');">'+buttonText+'</button>');
				
				return $(domWrapper)[0].outerHTML;
			}
		};
});