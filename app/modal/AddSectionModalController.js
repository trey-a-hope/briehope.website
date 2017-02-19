var App;
(function (App) {
    var Modal;
    (function (Modal) {
        var Image = App.Models.Image;
        var AddSectionModalController = (function () {
            function AddSectionModalController($scope, $modalInstance, myFirebaseRef) {
                var _this = this;
                this.$scope = $scope;
                this.$modalInstance = $modalInstance;
                this.myFirebaseRef = myFirebaseRef;
                this.save = function () {
                    var fileChooser = document.getElementById('file-chooser');
                    var file = fileChooser.files[0];
                    var image = new Image();
                    var newpostref = _this.myFirebaseRef.portfolioPageRef.push().key;
                    image.id = newpostref;
                    image.name = _this.name;
                    if (file) {
                        var uploadTask = _this.myFirebaseRef.storageRef.child("PortfolioPage/" + image.id).put(file);
                        uploadTask.on('state_changed', function (snapshot) {
                        }, function (error) {
                        }, function (success) {
                            var downloadURL = uploadTask.snapshot.downloadURL;
                            _this.myFirebaseRef.contactPageRef.child('Resume').set(downloadURL);
                            image.url = downloadURL;
                            _this.myFirebaseRef.portfolioPageRef.child(image.id).update(image);
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
            AddSectionModalController.$inject = [
                '$scope',
                '$modalInstance',
                'MyFirebaseRef'
            ];
            return AddSectionModalController;
        })();
        angular.module('BrieHope').controller('AddSectionModalController', AddSectionModalController);
    })(Modal = App.Modal || (App.Modal = {}));
})(App || (App = {}));
//# sourceMappingURL=AddSectionModalController.js.map