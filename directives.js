
bookApp.directive('modal', function () {
    return {
        restrict: 'EA',
        scope: {
            header: '=modalHeader',
            cartItems: '=modalBody',
            handler: '='
        },
        templateUrl: 'templates/cart.html',
        transclude: true,
        controller: function ($scope) {
            $scope.handler = 'pop';
        },
    };
});