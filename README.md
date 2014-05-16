Web-App-Seed
============

Web application seed based on Backbone.js with Require.js for async loading, themed with Twitter Bootstrap, with doT templating. 

Usage
-----

Index.html defines the single page point for the application. Define additional CSS and structure elements in index.html.  

The boostrapped loading for the application javascript resources is done in assets/js/main.js. This file defines the setup for require.js along with defining a startup processes for the webapp. Additional libraries can be added/shimmed into the setup in the require.js configuration at the top of this file. Libraries are stored in assets/js/lib.  

The application start point is defined in assets/js/app/app.js. This file describes the requirements for the application and exposes an initialization function to start the app. Extend this with the app specific logic.  

The main backbone router that is started with the app is defined at assets/js/app/routers/router.js. Extend this with additional routes and logic.  

Templates are stored in assets/js/app/templates. They are defined for use with the doT.js templating library that exposes the entirety of javascript to the templating engine. This allows templates to access and change functionality dynamically.  

Development
-----------

### Setup Environment:

#### Build Requirements:
- Node.js
- npm
- Bower (npm install -g bower)
- Mimosa (npm install -g mimosa)

When the above are successfully installed, run "mimosa build" or "mimosa build --minify" from the root directory of the project. Mimosa will then download the dependencies with bower, copy them over into the src directory as the latest versions., finally a "public" folder will be created with the results of the build. This can be used to deply the application.

#### Test Requirements:
- phantomjs (npm install -g phantomjs)

Credits
-------

- Author: [Drew Short](https://github.com/warricksothr)

Libraries
---------

- [doT.js (Template Engine)](http://olado.github.io/doT/index.html)
- [Require.js](http://requirejs.org/)
- [Require.js-doT plugin](https://github.com/ullmark/requirejs-doT)
- [Underscore.js](http://underscorejs.org/)
- [Backbone.js](http://backbonejs.org/)
- [jQuery](http://jquery.com/)
- [Twitter Bootstrap](http://getbootstrap.com/)
