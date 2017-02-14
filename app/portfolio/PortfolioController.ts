module App.Portfolio {
    class PortfolioController {

        static $inject = ['$scope', '$state'];
        constructor(public $scope: any, public $state: any) {
        }

        selectImage = (section: number): void =>{
            switch(section){
                case Section.Pic1:
                    alert("p1");
                    break;
                case Section.Pic2:
                    alert("p2");
                    break;
                default:
                    break;
            }
        }

    }

    enum Section{
        Pic1,
        Pic2
    }

    angular.module('BrieHope').controller('PortfolioController', PortfolioController);
}