define([
	"app/util",
	"json!app/data/app-data.json",
	], function(util, data) {
	"use_strict";
	
	var drawHeader = function() {
		util.renderTemplate("header", data, $("#header")[0]);
	};
	
	var drawFooter = function() {
		util.renderTemplate("footer", data, $("#footer")[0]);
	};
	
	return {"drawHeader": drawHeader, "drawFooter": drawFooter};
});