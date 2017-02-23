var App;
(function (App) {
    var Modal;
    (function (Modal) {
        var Image = App.Models.Image;
        var AddSectionModalController = (function () {
            function AddSectionModalController($scope, $modalInstance, myFirebaseRef, isEdit, section, modalService) {
                var _this = this;
                this.$scope = $scope;
                this.$modalInstance = $modalInstance;
                this.myFirebaseRef = myFirebaseRef;
                this.isEdit = isEdit;
                this.section = section;
                this.modalService = modalService;
                this.image = new Image();
                this.update = function () {
                    var fileChooser = document.getElementById('file-chooser');
                    var file = fileChooser.files[0];
                    if (_this.image.name && _this.image.subText) {
                        if (file) {
                            var uploadTask = _this.myFirebaseRef.storageRef.child("PortfolioPage/" + _this.image.id).put(file);
                            uploadTask.on('state_changed', function (snapshot) {
                            }, function (error) {
                            }, function (success) {
                                var downloadURL = uploadTask.snapshot.downloadURL;
                                _this.image.url = downloadURL;
                                _this.myFirebaseRef.portfolioPageRef.child(_this.image.id).update(_this.image);
                                _this.$modalInstance.close();
                            });
                        }
                        else {
                            _this.myFirebaseRef.portfolioPageRef.child(_this.image.id).update(_this.image);
                            _this.$modalInstance.close();
                        }
                    }
                    else {
                        _this.modalService.displayNotification("Must enter name and subtext for section.", "Cannot Save", "OK", false);
                    }
                };
                this.save = function () {
                    var fileChooser = document.getElementById('file-chooser');
                    var file = fileChooser.files[0];
                    var newpostref = _this.myFirebaseRef.portfolioPageRef.push().key;
                    _this.image.id = newpostref;
                    if (_this.image.name && _this.image.subText && file) {
                        var uploadTask = _this.myFirebaseRef.storageRef.child("PortfolioPage/" + _this.image.id).put(file);
                        uploadTask.on('state_changed', function (snapshot) {
                        }, function (error) {
                        }, function (success) {
                            var downloadURL = uploadTask.snapshot.downloadURL;
                            _this.image.url = downloadURL;
                            _this.myFirebaseRef.portfolioPageRef.child(_this.image.id).update(_this.image);
                            _this.$modalInstance.close();
                        });
                    }
                    else {
                        _this.modalService.displayNotification("Some info is incomplete.", "Cannot Save", "OK", false);
                    }
                };
                this.cancel = function () {
                    _this.$scope.$dismiss(false);
                };
                if (this.isEdit) {
                    this.image = section;
                }
            }
            AddSectionModalController.$inject = [
                '$scope',
                '$modalInstance',
                'MyFirebaseRef',
                'isEdit',
                'section',
                'ModalService'
            ];
            return AddSectionModalController;
        })();
        angular.module('BrieHope').controller('AddSectionModalController', AddSectionModalController);
    })(Modal = App.Modal || (App.Modal = {}));
})(App || (App = {}));
//# sourceMappingURL=AddSectionModalController.js.map