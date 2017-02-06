var App;
(function (App) {
    var Portfolio;
    (function (Portfolio) {
        var PortfolioController = (function () {
            function PortfolioController($scope) {
                this.$scope = $scope;
                this.name = "Trey";
            }
            PortfolioController.$inject = ['$scope'];
            return PortfolioController;
        })();
        angular.module('BrieHope').controller('PortfolioController', PortfolioController);
    })(Portfolio = App.Portfolio || (App.Portfolio = {}));
})(App || (App = {}));
//# sourceMappingURL=PortfolioController.js.map