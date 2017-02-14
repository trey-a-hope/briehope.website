module App.Landing {
    class LandingController {

        static $inject = ['$scope', '$state'];
        constructor(public $scope: any, public $state: any) {
        }

        enter = (): void =>{
            this.$state.go('portfolio');
        }

    }

    angular.module('BrieHope').controller('LandingController', LandingController);
}