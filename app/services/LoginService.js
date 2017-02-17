var App;
(function (App) {
    var Services;
    (function (Services) {
        var LoginService = (function () {
            function LoginService() {
                var _this = this;
                this.loggedIn = false;
                this.login = function () {
                    _this.loggedIn = true;
                };
                this.logout = function () {
                    _this.loggedIn = false;
                };
                this.isLoggedIn = function () {
                    return _this.loggedIn;
                };
            }
            return LoginService;
        })();
        Services.LoginService = LoginService;
        angular.module('BrieHope').service('LoginService', LoginService);
    })(Services = App.Services || (App.Services = {}));
})(App || (App = {}));
//# sourceMappingURL=LoginService.js.map