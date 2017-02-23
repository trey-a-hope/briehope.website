var App;
(function (App) {
    var Modal;
    (function (Modal) {
        var Image = App.Models.Image;
        var AddPhotoModalController = (function () {
            function AddPhotoModalController($scope, $modalInstance, myFirebaseRef, section, isEdit, _photo, modalService) {
                var _this = this;
                this.$scope = $scope;
                this.$modalInstance = $modalInstance;
                this.myFirebaseRef = myFirebaseRef;
                this.section = section;
                this.isEdit = isEdit;
                this._photo = _photo;
                this.modalService = modalService;
                this.photo = new Image();
                this.save = function () {
                    var fileChooser = document.getElementById('file-chooser');
                    var file = fileChooser.files[0];
                    var newpostref = _this.myFirebaseRef.portfolioPageRef.child(_this.section.id + '/photos').push().key;
                    _this.photo.id = newpostref;
                    if (_this.photo.name && _this.photo.subText && file) {
                        var uploadTask = _this.myFirebaseRef.storageRef.child("PortfolioPage/" + _this.photo.id).put(file);
                        uploadTask.on('state_changed', function (snapshot) {
                        }, function (error) {
                        }, function (success) {
                            var downloadURL = uploadTask.snapshot.downloadURL;
                            _this.photo.url = downloadURL;
                            _this.myFirebaseRef.portfolioPageRef.child(_this.section.id + '/photos/' + _this.photo.id).update(_this.photo);
                            _this.$modalInstance.close();
                        });
                    }
                    else {
                        _this.modalService.displayNotification("Some info is incomplete.", "Cannot Save", "OK", false);
                    }
                };
                this.update = function () {
                    var fileChooser = document.getElementById('file-chooser');
                    var file = fileChooser.files[0];
                    if (_this.photo.name && _this.photo.subText) {
                        if (file) {
                            var uploadTask = _this.myFirebaseRef.storageRef.child("PortfolioPage/" + _this.photo.id).put(file);
                            uploadTask.on('state_changed', function (snapshot) {
                            }, function (error) {
                            }, function (success) {
                                var downloadURL = uploadTask.snapshot.downloadURL;
                                _this.photo.url = downloadURL;
                                _this.myFirebaseRef.portfolioPageRef.child(_this.section.id + '/photos/' + _this.photo.id).update(_this.photo);
                                _this.$modalInstance.close();
                            });
                        }
                        else {
                            _this.myFirebaseRef.portfolioPageRef.child(_this.section.id + '/photos/' + _this.photo.id).update(_this.photo);
                            _this.$modalInstance.close();
                        }
                    }
                    else {
                        _this.modalService.displayNotification("Must enter name and subtext for phone.", "Cannot Save", "OK", false);
                    }
                };
                this.cancel = function () {
                    _this.$scope.$dismiss(false);
                };
                if (this.isEdit) {
                    this.photo = _photo;
                }
            }
            AddPhotoModalController.$inject = [
                '$scope',
                '$modalInstance',
                'MyFirebaseRef',
                'section',
                'isEdit',
                'photo',
                'ModalService'
            ];
            return AddPhotoModalController;
        })();
        angular.module('BrieHope').controller('AddPhotoModalController', AddPhotoModalController);
    })(Modal = App.Modal || (App.Modal = {}));
})(App || (App = {}));
//# sourceMappingURL=AddPhotoModalController.js.map