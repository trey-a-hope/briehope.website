var App;
(function (App) {
    var Portfolio;
    (function (Portfolio) {
        var ContactController = (function () {
            function ContactController($scope, $http, myFirebaseRef, modalService, loginService) {
                var _this = this;
                this.$scope = $scope;
                this.$http = $http;
                this.myFirebaseRef = myFirebaseRef;
                this.modalService = modalService;
                this.loginService = loginService;
                this.myEmailIsEditting = false;
                this.myPhoneNumberIsEditting = false;
                this.emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                this.sendEmail = function (form) {
                    if (form.$valid) {
                        var data = {
                            name: _this.name,
                            email: _this.email,
                            phoneNumber: _this.phoneNumber,
                            message: _this.message
                        };
                        _this.$http({
                            method: 'POST',
                            url: 'php/sendEmail.php',
                            data: data,
                            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                        }).success(function (result) {
                            _this.modalService.displayNotification('Message sent, I will respond shortly.', 'Got It', 'OK', true);
                        }).error(function (error) {
                            _this.modalService.displayNotification(error.message, 'Error', 'OK', false);
                        });
                    }
                    else {
                        _this.modalService.displayNotification('Some fields are incorrect/empty.', 'Error', 'OK', false);
                    }
                };
                this.uploadPDF = function () {
                    var fileChooser = document.getElementById('file-chooser');
                    var file = fileChooser.files[0];
                    if (file) {
                        var uploadTask = _this.myFirebaseRef.storageRef.child("ContactPage/Resume").put(file);
                        uploadTask.on('state_changed', function (snapshot) {
                        }, function (error) {
                            _this.modalService.displayNotification(error.message, 'Error', 'OK', false);
                        }, function (success) {
                            var downloadURL = uploadTask.snapshot.downloadURL;
                            _this.myFirebaseRef.contactPageRef.child('Resume').set(downloadURL);
                            _this.modalService.displayNotification('Resume uploaded successfully.', "Success", "OK", true);
                        });
                    }
                    else {
                        _this.modalService.displayNotification('Must upload a PDF', 'Error', 'OK', false);
                    }
                };
                this.toggleEdit = function (section) {
                    if (_this.loginService.isLoggedIn()) {
                        switch (section) {
                            case Section.Email:
                                if (_this.myEmailIsEditting) {
                                    _this.myFirebaseRef.contactPageRef.child('Email').set(_this.myEmail);
                                }
                                _this.myEmailIsEditting = !_this.myEmailIsEditting;
                                break;
                            case Section.PhoneNumber:
                                if (_this.myPhoneNumberIsEditting) {
                                    _this.myFirebaseRef.contactPageRef.child('PhoneNumber').set(_this.myPhoneNumber);
                                }
                                _this.myPhoneNumberIsEditting = !_this.myPhoneNumberIsEditting;
                                break;
                            default:
                                break;
                        }
                    }
                };
                this.myFirebaseRef.contactPageRef.child('Resume').on('value', function (snapshot) {
                    _this.resumeHyperlink = snapshot.val();
                    if (!_this.$scope.$$phase) {
                        _this.$scope.$apply();
                    }
                });
                this.myFirebaseRef.contactPageRef.child('Email').on('value', function (snapshot) {
                    _this.myEmail = snapshot.val();
                    if (!_this.$scope.$$phase) {
                        _this.$scope.$apply();
                    }
                });
                this.myFirebaseRef.contactPageRef.child('PhoneNumber').on('value', function (snapshot) {
                    _this.myPhoneNumber = snapshot.val();
                    if (!_this.$scope.$$phase) {
                        _this.$scope.$apply();
                    }
                });
            }
            ContactController.$inject = [
                '$scope',
                '$http',
                'MyFirebaseRef',
                'ModalService',
                'LoginService'
            ];
            return ContactController;
        })();
        var Section;
        (function (Section) {
            Section[Section["Email"] = 0] = "Email";
            Section[Section["PhoneNumber"] = 1] = "PhoneNumber";
        })(Section || (Section = {}));
        angular.module('BrieHope').controller('ContactController', ContactController);
    })(Portfolio = App.Portfolio || (App.Portfolio = {}));
})(App || (App = {}));
//# sourceMappingURL=ContactController.js.map