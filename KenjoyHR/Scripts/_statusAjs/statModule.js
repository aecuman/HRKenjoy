var app;
(function () {
    app = angular.module("crudModule", ['ui.bootstrap']);

    app.filter('Pagestart', function () {    // custom filter 
        return function (input, start) {
            if (input) {
                start = +start;
                return input.slice(start);
            }
            return [];
        }
    });
})()

