define([
	"doT!app/templates/header",
	"text!app/app-data.json",
	"doT!app/templates/footer",
	"text!app/app-data.json", "jquery"
	], function(headerTmpl, headerData, footerTmpl, footerData) {
	'use_strict'
	
	var drawHeader = function() {
			var data = JSON.parse(headerData)
			$("#header")[0].innerHTML = headerTmpl(data);
	};
	
	var drawFooter = function() {
			var data = JSON.parse(footerData)
			$("#footer")[0].innerHTML = footerTmpl(data);
	};
	
	return {"drawHeader": drawHeader, "drawFooter": drawFooter};
});