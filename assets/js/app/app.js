define(["jquery", "bootstrap", "underscore", "backbone"], function () {

    var init = function () {
        //Draw the header on the page
        require(["app/interface/draw_header"], function (func) {
            func();
        });

        //Draw the footer on the page
        require(["app/interface/draw_footer"], function (func) {
            func();
        });
    }

    return {"init": init}
});