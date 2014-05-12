/*global define*/
define([
	'jquery',
	'backbone',
	'app/util',
	'text!app/app-data.json'
], function ($, Backbone, util, appInfoText) {
		'use strict';

	var AboutView = Backbone.View.extend({

		// Instead of generating a new element, bind to the existing skeleton of
		// the App already present in the HTML.
		el: '#content',

		// Re-rendering the App just means refreshing the statistics -- the rest
		// of the app doesn't change.
		render: function () {
			var data = JSON.parse(appInfoText);
			util.renderTemplate("about", data, this.el)
		}
	})
	
	return AboutView;
});