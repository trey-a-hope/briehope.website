var App;
(function (App) {
    var Portfolio;
    (function (Portfolio) {
        var AboutController = (function () {
            function AboutController($scope, myFirebaseRef, modalService, loginService) {
                var _this = this;
                this.$scope = $scope;
                this.myFirebaseRef = myFirebaseRef;
                this.modalService = modalService;
                this.loginService = loginService;
                this.title1IsEditting = false;
                this.paragraph1IsEditting = false;
                this.setUI = function () {
                    _this.myFirebaseRef.aboutPageRef.child('Title1').on('value', function (snapshot) {
                        _this.title1 = snapshot.val();
                        if (!_this.$scope.$$phase) {
                            _this.$scope.$apply();
                        }
                    });
                    _this.myFirebaseRef.aboutPageRef.child('Paragraph1').on('value', function (snapshot) {
                        _this.paragraph1 = snapshot.val();
                        if (!_this.$scope.$$phase) {
                            _this.$scope.$apply();
                        }
                    });
                };
                this.toggleEdit = function (section) {
                    switch (section) {
                        case Section.Title1:
                            if (_this.title1IsEditting) {
                                _this.myFirebaseRef.aboutPageRef.child('Title1').set(_this.title1);
                            }
                            _this.title1IsEditting = !_this.title1IsEditting;
                            break;
                        case Section.Paragraph1:
                            if (_this.paragraph1IsEditting) {
                                _this.myFirebaseRef.aboutPageRef.child('Paragraph1').set(_this.paragraph1);
                            }
                            _this.paragraph1IsEditting = !_this.paragraph1IsEditting;
                            break;
                        default:
                            break;
                    }
                };
                this.setUI();
            }
            AboutController.$inject = ['$scope', 'MyFirebaseRef', 'ModalService', 'LoginService'];
            return AboutController;
        })();
        var Section;
        (function (Section) {
            Section[Section["Title1"] = 0] = "Title1";
            Section[Section["Paragraph1"] = 1] = "Paragraph1";
        })(Section || (Section = {}));
        angular.module('BrieHope').controller('AboutController', AboutController);
    })(Portfolio = App.Portfolio || (App.Portfolio = {}));
})(App || (App = {}));
//# sourceMappingURL=AboutController.js.map