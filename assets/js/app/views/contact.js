/*global define*/
define([
	'jquery',
	'backbone',
	'doT!app/templates/contact'
], function ($, Backbone, tmpl) {
		'use strict';

	var ContactView = Backbone.View.extend({

		// Instead of generating a new element, bind to the existing skeleton of
		// the App already present in the HTML.
		el: '#content',

		// Re-rendering the App just means refreshing the statistics -- the rest
		// of the app doesn't change.
		render: function () {
			this.$el.html(tmpl());
		}
	})
	
	return ContactView;
});