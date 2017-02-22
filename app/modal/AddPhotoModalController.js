var App;
(function (App) {
    var Modal;
    (function (Modal) {
        var Image = App.Models.Image;
        var AddPhotoModalController = (function () {
            function AddPhotoModalController($scope, $modalInstance, myFirebaseRef, section) {
                var _this = this;
                this.$scope = $scope;
                this.$modalInstance = $modalInstance;
                this.myFirebaseRef = myFirebaseRef;
                this.section = section;
                this.photo = new Image();
                this.save = function () {
                    var fileChooser = document.getElementById('file-chooser');
                    var file = fileChooser.files[0];
                    var newpostref = _this.myFirebaseRef.portfolioPageRef.child(_this.section.id + '/photos').push().key;
                    _this.photo.id = newpostref;
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
                    }
                };
                this.cancel = function () {
                    _this.$scope.$dismiss(false);
                };
            }
            AddPhotoModalController.$inject = [
                '$scope',
                '$modalInstance',
                'MyFirebaseRef',
                'section'
            ];
            return AddPhotoModalController;
        })();
        angular.module('BrieHope').controller('AddPhotoModalController', AddPhotoModalController);
    })(Modal = App.Modal || (App.Modal = {}));
})(App || (App = {}));
//# sourceMappingURL=AddPhotoModalController.js.map