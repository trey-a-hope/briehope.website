var App;
(function (App) {
    var Landing;
    (function (Landing) {
        var LandingController = (function () {
            function LandingController($scope, $state) {
                var _this = this;
                this.$scope = $scope;
                this.$state = $state;
                this.enter = function () {
                    _this.$state.go('portfolio');
                };
            }
            LandingController.$inject = ['$scope', '$state'];
            return LandingController;
        })();
        angular.module('BrieHope').controller('LandingController', LandingController);
    })(Landing = App.Landing || (App.Landing = {}));
})(App || (App = {}));
//# sourceMappingURL=LandingController.js.map