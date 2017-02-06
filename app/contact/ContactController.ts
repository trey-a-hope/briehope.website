module App.Portfolio {
    class ContactController {

        static $inject = ['$scope'];
        constructor(public $scope: any) {
        }

    }

    angular.module('BrieHope').controller('ContactController', ContactController);
}