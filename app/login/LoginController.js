var App;
(function (App) {
    var Login;
    (function (Login) {
        var LoginController = (function () {
            function LoginController($scope, modalService, loginService) {
                var _this = this;
                this.$scope = $scope;
                this.modalService = modalService;
                this.loginService = loginService;
                this.getPasscode = function () {
                    _this.answer = '1234';
                };
                this.login = function () {
                    if (_this.passcode == _this.answer) {
                        _this.loginService.login();
                        console.log(_this.loginService.isLoggedIn());
                        _this.modalService.displayNotification("Loggin in.", "Success", "OK", true);
                    }
                    else {
                        _this.modalService.displayNotification("Login info is incorrect.", "Sorry", "OK", false);
                    }
                };
                this.getPasscode();
            }
            LoginController.$inject = ['$scope', 'ModalService', 'LoginService'];
            return LoginController;
        })();
        angular.module('BrieHope').controller('LoginController', LoginController);
    })(Login = App.Login || (App.Login = {}));
})(App || (App = {}));
//# sourceMappingURL=LoginController.js.map