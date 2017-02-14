var App;
(function (App) {
    var Portfolio;
    (function (Portfolio) {
        var ContactController = (function () {
            function ContactController($scope, $http, myFirebaseRef, modalService) {
                var _this = this;
                this.$scope = $scope;
                this.$http = $http;
                this.myFirebaseRef = myFirebaseRef;
                this.modalService = modalService;
                this.sendEmail = function (form) {
                    var data = {
                        name: _this.name,
                        email: _this.email,
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
                };
                this.uploadPDF = function () {
                    var fileChooser = document.getElementById('file-chooser');
                    var file = fileChooser.files[0];
                    if (file) {
                        var uploadTask = _this.myFirebaseRef.storageRef.child("Documents/PDFs/Resume").put(file);
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
                this.myFirebaseRef.contactPageRef.child('Resume').on('value', function (snapshot) {
                    _this.resumeHyperlink = snapshot.val();
                    _this.$scope.$apply();
                });
            }
            ContactController.$inject = ['$scope', '$http', 'MyFirebaseRef', 'ModalService'];
            return ContactController;
        })();
        angular.module('BrieHope').controller('ContactController', ContactController);
    })(Portfolio = App.Portfolio || (App.Portfolio = {}));
})(App || (App = {}));
//# sourceMappingURL=ContactController.js.map