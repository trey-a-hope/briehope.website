var App;
(function (App) {
    var Login;
    (function (Login) {
        var LoginController = (function () {
            function LoginController($scope, modalService, loginService, myFirebaseRef, $state) {
                var _this = this;
                this.$scope = $scope;
                this.modalService = modalService;
                this.loginService = loginService;
                this.myFirebaseRef = myFirebaseRef;
                this.$state = $state;
                this.login = function () {
                    if (_this.passcode == _this.answer) {
                        _this.loginService.login();
                        _this.modalService.displayNotification("Welcome Brie, you're now logged in. Your session will end when the page refreshes.", "Success", "OK", true);
                        _this.$state.go('intro');
                    }
                    else {
                        _this.modalService.displayNotification("Login info is incorrect.", "Sorry", "OK", false);
                    }
                };
                this.myFirebaseRef.loginPageRef.child('Passcode').on('value', function (snapshot) {
                    _this.answer = snapshot.val();
                    if (!_this.$scope.$$phase) {
                        _this.$scope.$apply();
                    }
                });
            }
            LoginController.$inject = [
                '$scope',
                'ModalService',
                'LoginService',
                'MyFirebaseRef',
                '$state'
            ];
            return LoginController;
        })();
        angular.module('BrieHope').controller('LoginController', LoginController);
    })(Login = App.Login || (App.Login = {}));
})(App || (App = {}));
//# sourceMappingURL=LoginController.js.map