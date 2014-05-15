define(["bootstrap", "underscore", "backbone", "app/routers/router", "jquery"], function (Bootstrap, _, Backbone, Workspace) {

		//Initialize the application
    var init = function () {
				//Draw the Header and Footer
        require(["app/interface"], function (iface) {
            iface.drawHeader();
						iface.drawFooter();
        });
				// Initialize the main router
				new Workspace();
				// Enable history
				Backbone.history.start();
				// Route to the main page
				// Happens by default
    };

    return {"init": init};
});