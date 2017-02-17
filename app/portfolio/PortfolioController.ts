module App.Portfolio {
    import Image = App.Models.Image;
    import LoginService = App.Services.LoginService;

    class PortfolioController {
        images: Array<Image> = new Array<Image>();

        static $inject = ['$scope', '$state', 'LoginService'];
        constructor(public $scope: any, public $state: any, public loginService: LoginService) {
            this.setImages();
        }

        selectImage = (image: Image): void =>{
            alert(image.name);
        }

        addSection = (): void =>{
            alert("Working on adding section.");
        }

        deleteSection = (): void =>{
            alert("Working on deleting section.");
        }

        setImages = (): void =>{
            var image = new Image();
            image.id = 1;
            image.name = "Mountains";
            this.images.push(image);
            image = new Image();
            image.id = 2;
            image.name = "New Areas";
            this.images.push(image);
            image = new Image();
            image.id = 3;
            image.name = "Water Falls";
            this.images.push(image);
            image = new Image();
            image.id = 4;
            image.name = "Focus";
            this.images.push(image);
            image = new Image();
            image.id = 5;
            image.name = "Territory";
            this.images.push(image);
            image = new Image();
            image.id = 6;
            image.name = "Trees";
            this.images.push(image);
        }

    }

    angular.module('BrieHope').controller('PortfolioController', PortfolioController);
}