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
- Compass (Ruby is required. gem install compass) (compile sass and scss files to their respective css counterparts)

When the above are successfully installed, run "mimosa build" or "mimosa build --minify" from the root directory of the project. Mimosa will then download the dependencies with bower, copy them over into the src directory as the latest versions. Finally a "public" folder will be created with the results of the build. This can be used to deploy the application.

#### Test Requirements:
- phantomjs (npm install -g phantomjs)

Unit tests are run automatically during the build process if the phantomjs library is available. If not they will fail and report an error. For the sake of updating the styling and templates that is okay. Anything deeper and you should be running the tests to ensure compatability.

QUnit is the testing framework that is being used, and it is already AMD compatible for the purposes of this project.

Tests are stored in assets/js/test and will be automatically parsed and run if they end with any of the following. _test.js, -test.js, _spec.js, -spec.js.
It is preferred that the suffixes for tests be consistent and promptly follow the name of the module they are testing. IE... the util-test.js contains the unit tests for the util.js module.

Credits
-------

- Author/Maintainer: [Drew Short](https://github.com/warricksothr)

Libraries
---------

- [doT.js](Template Engine)](http://olado.github.io/doT/index.html)
- [Require.js](http://requirejs.org/)
- [Require.js-doT plugin](https://github.com/ullmark/requirejs-doT)
- [Require.js plugins](https://github.com/millermedeiros/requirejs-plugins)
- [Underscore.js](http://underscorejs.org/)
- [Backbone.js](http://backbonejs.org/)
- [jQuery](http://jquery.com/)
- [Twitter Bootstrap](http://getbootstrap.com/)

Tools
-----

- [Mimosa](http://mimosa.io/) (Build Tool)
- [Bower](http://bower.io/) (Dependency Management)
- [SASS](http://sass-lang.com/) (Stylesheet meta language)
- [Compass](http://compass-style.org/) (SASS utility)