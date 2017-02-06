var App;
(function (App) {
    var Portfolio;
    (function (Portfolio) {
        var ContactController = (function () {
            function ContactController($scope) {
                this.$scope = $scope;
            }
            ContactController.$inject = ['$scope'];
            return ContactController;
        })();
        angular.module('BrieHope').controller('ContactController', ContactController);
    })(Portfolio = App.Portfolio || (App.Portfolio = {}));
})(App || (App = {}));
//# sourceMappingURL=ContactController.js.map