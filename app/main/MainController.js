var App;
(function (App) {
    var Main;
    (function (Main) {
        var MainController = (function () {
            function MainController($scope, $state, myFirebaseRef) {
                var _this = this;
                this.$scope = $scope;
                this.$state = $state;
                this.myFirebaseRef = myFirebaseRef;
                this.getStyle = function () {
                    return {
                        background: 'url(' + _this.backgroundImageUrl + ') no-repeat center center fixed'
                    };
                };
                this.myFirebaseRef.mainContRef.child('BackgroundPicture').on('value', function (snapshot) {
                    _this.backgroundImageUrl = snapshot.val();
                    if (!_this.$scope.$$phase) {
                        _this.$scope.$apply();
                    }
                });
                this.isOnLandingPage = $state.includes('intro');
                this.$scope.$watch(function () {
                    return _this.$state.$current.name;
                }, function (newVal, oldVal) {
                    _this.isOnLandingPage = $state.includes('intro');
                });
            }
            MainController.$inject = ['$scope', '$state', 'MyFirebaseRef'];
            return MainController;
        })();
        angular.module('BrieHope').controller('MainController', MainController);
    })(Main = App.Main || (App.Main = {}));
})(App || (App = {}));
//# sourceMappingURL=MainController.js.map