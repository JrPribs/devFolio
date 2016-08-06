(function() {
    'use strict';

    function breakoutCanvas() {
        return {
            restrict: 'E',
            scope: {
                layout: '='
            },
            bindToController: true,
            controller: 'breakoutCanvasController as canvasCtrl',
            templateUrl: 'views/canvas.html',
            link: function(scope, element, attrs) {

            }
        };
    }

    angular
        .module('breakout')
        .directive('breakoutCanvas', breakoutCanvas);
})();
