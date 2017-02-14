var App;
(function (App) {
    var Portfolio;
    (function (Portfolio) {
        var PortfolioController = (function () {
            function PortfolioController($scope, $state) {
                this.$scope = $scope;
                this.$state = $state;
                this.selectImage = function (section) {
                    switch (section) {
                        case Section.Pic1:
                            alert("p1");
                            break;
                        case Section.Pic2:
                            alert("p2");
                            break;
                        default:
                            break;
                    }
                };
            }
            PortfolioController.$inject = ['$scope', '$state'];
            return PortfolioController;
        })();
        var Section;
        (function (Section) {
            Section[Section["Pic1"] = 0] = "Pic1";
            Section[Section["Pic2"] = 1] = "Pic2";
        })(Section || (Section = {}));
        angular.module('BrieHope').controller('PortfolioController', PortfolioController);
    })(Portfolio = App.Portfolio || (App.Portfolio = {}));
})(App || (App = {}));
//# sourceMappingURL=PortfolioController.js.map