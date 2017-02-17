var App;
(function (App) {
    var Portfolio;
    (function (Portfolio) {
        var Image = App.Models.Image;
        var PortfolioController = (function () {
            function PortfolioController($scope, $state, loginService) {
                var _this = this;
                this.$scope = $scope;
                this.$state = $state;
                this.loginService = loginService;
                this.images = new Array();
                this.selectImage = function (image) {
                    alert(image.name);
                };
                this.addSection = function () {
                    alert("Working on adding section.");
                };
                this.deleteSection = function () {
                    alert("Working on deleting section.");
                };
                this.setImages = function () {
                    var image = new Image();
                    image.id = 1;
                    image.name = "Mountains";
                    _this.images.push(image);
                    image = new Image();
                    image.id = 2;
                    image.name = "New Areas";
                    _this.images.push(image);
                    image = new Image();
                    image.id = 3;
                    image.name = "Water Falls";
                    _this.images.push(image);
                    image = new Image();
                    image.id = 4;
                    image.name = "Focus";
                    _this.images.push(image);
                    image = new Image();
                    image.id = 5;
                    image.name = "Territory";
                    _this.images.push(image);
                    image = new Image();
                    image.id = 6;
                    image.name = "Trees";
                    _this.images.push(image);
                };
                this.setImages();
            }
            PortfolioController.$inject = ['$scope', '$state', 'LoginService'];
            return PortfolioController;
        })();
        angular.module('BrieHope').controller('PortfolioController', PortfolioController);
    })(Portfolio = App.Portfolio || (App.Portfolio = {}));
})(App || (App = {}));
//# sourceMappingURL=PortfolioController.js.map