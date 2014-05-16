define([
	'backbone',
	'app/views/home',
	'app/views/about',
	'app/views/contact'
], function (Backbone, HomeView, AboutView, ContactView) {
	'use strict';

	return Backbone.Router.extend({
		routes: {
			'':'home',// #
			'about':'about',// #about
			'contact':'contact'// #contact
		},

		home: function() {
			new HomeView().render();
		},
		
		about: function() {
			new AboutView().render();
		},
		
		contact: function() {
			new ContactView().render();
		}
	});
});