define([
	'jquery',
	'backbone',
	'app/views/home',
	'app/views/about',
	'app/views/contact',
], function ($, Backbone, homeView, aboutView, contactView) {
	'use strict';

	var MainRouter = Backbone.Router.extend({
		routes: {
			'': 				'home',			// #
			'about': 		'about',		// #about
			'contact':	'contact'		// #contact
		},

		home: function() {
			new homeView().render();
		},
		
		about: function() {
			new aboutView().render();
		},
		
		contact: function() {
			new contactView().render();
		}
	});

	return MainRouter;
});