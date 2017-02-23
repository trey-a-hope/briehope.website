var App;
(function (App) {
    var Portfolio;
    (function (Portfolio) {
        var FullPortfolioController = (function () {
            function FullPortfolioController($scope, $state, loginService, myFirebaseRef, $modal, modalService, $stateParams) {
                var _this = this;
                this.$scope = $scope;
                this.$state = $state;
                this.loginService = loginService;
                this.myFirebaseRef = myFirebaseRef;
                this.$modal = $modal;
                this.modalService = modalService;
                this.$stateParams = $stateParams;
                this.photos = new Array();
                this.addPhoto = function () {
                    _this.$modal.open({
                        templateUrl: 'app/modal/AddPhotoModalTemplate.html',
                        controller: 'AddPhotoModalController as vm',
                        size: 'md',
                        backdrop: 'static',
                        resolve: {
                            section: function () {
                                return _this.section;
                            },
                            isEdit: function () {
                                return false;
                            },
                            photo: function () {
                                return null;
                            }
                        }
                    }).result
                        .then(function (result) {
                        _this.modalService.displayNotification("Your photo has been uploaded.", "Success", "OK", true);
                    })
                        .catch(function (error) {
                    });
                };
                this.editImage = function (photo) {
                    _this.$modal.open({
                        templateUrl: 'app/modal/AddPhotoModalTemplate.html',
                        controller: 'AddPhotoModalController as vm',
                        size: 'md',
                        backdrop: 'static',
                        resolve: {
                            section: function () {
                                return _this.section;
                            },
                            isEdit: function () {
                                return true;
                            },
                            photo: function () {
                                return photo;
                            }
                        }
                    }).result
                        .then(function (result) {
                        _this.modalService.displayNotification("Your photo has been uploaded.", "Success", "OK", true);
                    })
                        .catch(function (error) {
                    });
                };
                this.deleteImage = function (photo) {
                    _this.modalService.displayConfirmation("Are you sure you want to delete the " + photo.name + " photo?", "Delete", "Yes", false)
                        .then(function (result) {
                        _this.myFirebaseRef.portfolioPageRef.child(_this.section.id + '/photos/' + photo.id).remove();
                        _this.myFirebaseRef.storageRef.child('PortfolioPage/' + photo.id).delete()
                            .then(function (result) {
                            _this.modalService.displayNotification("Photo deleted successfully.", "Success", "OK", true);
                        })
                            .catch(function (error) {
                            _this.modalService.displayNotification(error.message, "Error", "OK", false);
                        });
                    })
                        .catch(function (error) {
                    })
                        .finally(function () {
                    });
                };
                if (this.$state.params.section == null) {
                    this.$state.go('portfolio');
                }
                else {
                    this.section = this.$state.params.section;
                }
                this.myFirebaseRef.portfolioPageRef.child(this.section.id + '/photos').on('value', function (snapshot) {
                    _this.photos = snapshot.val();
                    if (!_this.$scope.$$phase) {
                        _this.$scope.$apply();
                    }
                });
            }
            FullPortfolioController.$inject = [
                '$scope',
                '$state',
                'LoginService',
                'MyFirebaseRef',
                '$modal',
                'ModalService',
                '$stateParams'
            ];
            return FullPortfolioController;
        })();
        angular.module('BrieHope').controller('FullPortfolioController', FullPortfolioController);
    })(Portfolio = App.Portfolio || (App.Portfolio = {}));
})(App || (App = {}));
//# sourceMappingURL=FullPortfolioController.js.map