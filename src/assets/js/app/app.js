define(["backbone", "app/routers/router", "jquery", "bootstrap"], function (Backbone, Workspace) {

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