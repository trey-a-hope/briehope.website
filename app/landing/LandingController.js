var App;
(function (App) {
    var Landing;
    (function (Landing) {
        var LandingController = (function () {
            function LandingController($scope, $state, myFirebaseRef, loginService) {
                var _this = this;
                this.$scope = $scope;
                this.$state = $state;
                this.myFirebaseRef = myFirebaseRef;
                this.loginService = loginService;
                this.titleIsEditting = false;
                this.subTitleIsEditting = false;
                this.enter = function () {
                    _this.$state.go('portfolio');
                };
                this.toggleEdit = function (section) {
                    switch (section) {
                        case Section.Title:
                            if (_this.titleIsEditting) {
                                _this.myFirebaseRef.landingPageRef.child('Title').set(_this.title);
                            }
                            _this.titleIsEditting = !_this.titleIsEditting;
                            break;
                        case Section.SubTitle:
                            if (_this.subTitleIsEditting) {
                                _this.myFirebaseRef.landingPageRef.child('SubTitle').set(_this.subTitle);
                            }
                            _this.subTitleIsEditting = !_this.subTitleIsEditting;
                            break;
                        default:
                            break;
                    }
                };
                this.myFirebaseRef.landingPageRef.child('Title').on('value', function (snapshot) {
                    _this.title = snapshot.val();
                    _this.$scope.$apply();
                });
                this.myFirebaseRef.landingPageRef.child('SubTitle').on('value', function (snapshot) {
                    _this.subTitle = snapshot.val();
                    _this.$scope.$apply();
                });
            }
            LandingController.$inject = ['$scope', '$state', 'MyFirebaseRef', 'LoginService'];
            return LandingController;
        })();
        var Section;
        (function (Section) {
            Section[Section["Title"] = 0] = "Title";
            Section[Section["SubTitle"] = 1] = "SubTitle";
        })(Section || (Section = {}));
        angular.module('BrieHope').controller('LandingController', LandingController);
    })(Landing = App.Landing || (App.Landing = {}));
})(App || (App = {}));
//# sourceMappingURL=LandingController.js.map