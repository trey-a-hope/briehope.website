var App;
(function (App) {
    var Portfolio;
    (function (Portfolio) {
        var Image = App.Models.Image;
        var AboutController = (function () {
            function AboutController($scope, myFirebaseRef, modalService, loginService) {
                var _this = this;
                this.$scope = $scope;
                this.myFirebaseRef = myFirebaseRef;
                this.modalService = modalService;
                this.loginService = loginService;
                this.image = new Image();
                this.test = "In Process";
                this.title1IsEditting = false;
                this.paragraph1IsEditting = false;
                this.imageDoneDownloading = false;
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
                this.uploadPicture = function () {
                    var fileChooser = document.getElementById('file-chooser');
                    var file = fileChooser.files[0];
                    var image = new Image();
                    if (file) {
                        var uploadTask = _this.myFirebaseRef.storageRef.child("AboutPage/ProfilePicture").put(file);
                        uploadTask.on('state_changed', function (snapshot) { }, function (error) { }, function (success) {
                            var downloadURL = uploadTask.snapshot.downloadURL;
                            image.url = downloadURL;
                            _this.myFirebaseRef.aboutPageRef.child('Image').update(image);
                            _this.modalService.displayNotification("Image uploaded successfully.", "Success", "OK", true);
                        });
                    }
                    else {
                        _this.modalService.displayNotification("Must select picture first.", "Error", "OK", false);
                    }
                };
                this.myFirebaseRef.aboutPageRef.child('Title1').on('value', function (snapshot) {
                    _this.title1 = snapshot.val();
                    if (!_this.$scope.$$phase) {
                        _this.$scope.$apply();
                    }
                });
                this.myFirebaseRef.aboutPageRef.child('Paragraph1').on('value', function (snapshot) {
                    _this.paragraph1 = snapshot.val();
                    if (!_this.$scope.$$phase) {
                        _this.$scope.$apply();
                    }
                });
                this.myFirebaseRef.aboutPageRef.child('Image').on('value', function (snapshot) {
                    _this.image = snapshot.val();
                    if (!_this.$scope.$$phase) {
                        _this.imageDoneDownloading = true;
                        _this.$scope.$apply();
                    }
                    _this.imageDoneDownloading = true;
                });
            }
            AboutController.$inject = [
                '$scope',
                'MyFirebaseRef',
                'ModalService',
                'LoginService'
            ];
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