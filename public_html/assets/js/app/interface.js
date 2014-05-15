define([
	"doT!app/templates/header",
	"json!app/data/app-data.json",
	"doT!app/templates/footer",
	"json!app/data/app-data.json", "jquery"
	], function(headerTmpl, headerData, footerTmpl, footerData) {
	'use_strict'
	
	var drawHeader = function() {
			$("#header")[0].innerHTML = headerTmpl(headerData);
	};
	
	var drawFooter = function() {
			$("#footer")[0].innerHTML = footerTmpl(footerData);
	};
	
	return {"drawHeader": drawHeader, "drawFooter": drawFooter};
});