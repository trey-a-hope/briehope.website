module App.Portfolio {
    class AboutController {

        static $inject = ['$scope'];
        constructor(public $scope: any) {
        }

    }

    angular.module('BrieHope').controller('AboutController', AboutController);
}