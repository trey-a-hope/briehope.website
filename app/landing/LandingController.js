var App;
(function (App) {
    var Landing;
    (function (Landing) {
        var LandingController = (function () {
            function LandingController($scope, $state, myFirebaseRef, loginService, modalService) {
                var _this = this;
                this.$scope = $scope;
                this.$state = $state;
                this.myFirebaseRef = myFirebaseRef;
                this.loginService = loginService;
                this.modalService = modalService;
                this.titleIsEditting = false;
                this.subTitleIsEditting = false;
                this.buttonIsEditting = false;
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
                        case Section.Button:
                            if (_this.buttonIsEditting) {
                                _this.myFirebaseRef.landingPageRef.child('Button').set(_this.buttonText);
                            }
                            _this.buttonIsEditting = !_this.buttonIsEditting;
                            break;
                        default:
                            break;
                    }
                };
                this.updatePasscode = function () {
                    if (_this.passcode != null && _this.passcode.length > 0) {
                        _this.myFirebaseRef.loginPageRef.child("Passcode").set(_this.passcode);
                        _this.modalService.displayNotification("Your passcode has been udpated.", "Success", "OK", true);
                    }
                };
                this.myFirebaseRef.landingPageRef.child('Title').on('value', function (snapshot) {
                    _this.title = snapshot.val();
                    if (!_this.$scope.$$phase) {
                        _this.$scope.$apply();
                    }
                });
                this.myFirebaseRef.landingPageRef.child('SubTitle').on('value', function (snapshot) {
                    _this.subTitle = snapshot.val();
                    if (!_this.$scope.$$phase) {
                        _this.$scope.$apply();
                    }
                });
                this.myFirebaseRef.loginPageRef.child('Passcode').on('value', function (snapshot) {
                    _this.passcode = snapshot.val();
                    if (!_this.$scope.$$phase) {
                        _this.$scope.$apply();
                    }
                });
                this.myFirebaseRef.landingPageRef.child('Button').on('value', function (snapshot) {
                    _this.buttonText = snapshot.val();
                    if (!_this.$scope.$$phase) {
                        _this.$scope.$apply();
                    }
                });
            }
            LandingController.$inject = [
                '$scope',
                '$state',
                'MyFirebaseRef',
                'LoginService',
                'ModalService'
            ];
            return LandingController;
        })();
        var Section;
        (function (Section) {
            Section[Section["Title"] = 0] = "Title";
            Section[Section["SubTitle"] = 1] = "SubTitle";
            Section[Section["Button"] = 2] = "Button";
        })(Section || (Section = {}));
        angular.module('BrieHope').controller('LandingController', LandingController);
    })(Landing = App.Landing || (App.Landing = {}));
})(App || (App = {}));
//# sourceMappingURL=LandingController.js.map