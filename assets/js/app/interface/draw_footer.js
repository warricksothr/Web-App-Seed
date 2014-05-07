define(["doT!template/footer", "text!app/app-data.js"], function(tmpl, data_text) {
  //return as a function that can be called to display the header
  return function() {
    var data = JSON.parse(data_text)
    $("#footer")[0].innerHTML = tmpl(data);
  };
});