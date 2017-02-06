var App;
(function (App) {
    var Portfolio;
    (function (Portfolio) {
        var AboutController = (function () {
            function AboutController($scope) {
                this.$scope = $scope;
            }
            AboutController.$inject = ['$scope'];
            return AboutController;
        })();
        angular.module('BrieHope').controller('AboutController', AboutController);
    })(Portfolio = App.Portfolio || (App.Portfolio = {}));
})(App || (App = {}));
//# sourceMappingURL=AboutController.js.map