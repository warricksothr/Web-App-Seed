define(["doT!template/header", "text!app/app-data.js"], function(tmpl, data_text) {
  //return as a function that can be called to display the header
  return function() {
    var data = JSON.parse(data_text)
    $("#header")[0].innerHTML = tmpl(data);
  };
});