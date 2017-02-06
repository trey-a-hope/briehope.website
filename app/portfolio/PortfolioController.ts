module App.Portfolio {
    class PortfolioController {
        name: string;

        static $inject = ['$scope'];
        constructor(public $scope: any) {
            this.name = "Trey";
        }

    }

    angular.module('BrieHope').controller('PortfolioController', PortfolioController);
}