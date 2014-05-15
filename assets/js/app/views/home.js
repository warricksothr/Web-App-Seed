/*global define*/
define([
	'jquery',
	'backbone',
	'app/util'
], function ($, Backbone, util) {
		'use strict';

	var HomeView = Backbone.View.extend({

		// Instead of generating a new element, bind to the existing skeleton of
		// the App already present in the HTML.
		el: '#content',

		// Re-rendering the App just means refreshing the statistics -- the rest
		// of the app doesn't change.
		render: function () {
			util.renderTemplate("home", {}, this.el)
		}
	})
	
	return HomeView;
});