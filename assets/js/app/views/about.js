/*global define*/
define([
	'jquery',
	'backbone',
	'app/util',
	'json!app/data/app-data.json'],
	function ($, Backbone, util, appInfo) {
		'use strict';

	var AboutView = Backbone.View.extend({

		// Instead of generating a new element, bind to the existing skeleton of
		// the App already present in the HTML.
		el: '#content',

		// Re-rendering the App just means refreshing the statistics -- the rest
		// of the app doesn't change.
		render: function () {
			util.renderTemplate("about", appInfo, this.el)
		}
	})
	
	return AboutView;
});