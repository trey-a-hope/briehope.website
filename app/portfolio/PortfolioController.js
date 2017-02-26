var App;
(function (App) {
    var Portfolio;
    (function (Portfolio) {
        var PortfolioController = (function () {
            function PortfolioController($scope, $state, loginService, myFirebaseRef, $modal, modalService) {
                var _this = this;
                this.$scope = $scope;
                this.$state = $state;
                this.loginService = loginService;
                this.myFirebaseRef = myFirebaseRef;
                this.$modal = $modal;
                this.modalService = modalService;
                this.sections = new Array();
                this.selectImage = function (section) {
                    _this.$state.go('full-portfolio', {
                        section: section
                    });
                };
                this.addSection = function () {
                    _this.$modal.open({
                        templateUrl: 'app/modal/AddSectionModalTemplate.html',
                        controller: 'AddSectionModalController as vm',
                        size: 'md',
                        backdrop: 'static',
                        resolve: {
                            isEdit: function () {
                                return false;
                            },
                            section: function () {
                                return null;
                            }
                        }
                    }).result
                        .then(function (result) {
                        _this.modalService.displayNotification("Your section has been uploaded.", "Success", "OK", true);
                    })
                        .catch(function (error) {
                    });
                };
                this.deleteSection = function (section) {
                    _this.modalService.displayConfirmation("Are you sure you want to delete the " + section.name + " section?", "Delete", "Yes", false)
                        .then(function (result) {
                        _this.myFirebaseRef.portfolioPageRef.child(section.id).remove();
                        angular.forEach(section.photos, function (photo, index) {
                            _this.myFirebaseRef.storageRef.child('PortfolioPage/' + photo.id).delete();
                        });
                        _this.myFirebaseRef.storageRef.child('PortfolioPage/' + section.id).delete()
                            .then(function (result) {
                            _this.modalService.displayNotification("Section deleted successfully.", "Success", "OK", true);
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
                this.editSection = function (section) {
                    _this.$modal.open({
                        templateUrl: 'app/modal/AddSectionModalTemplate.html',
                        controller: 'AddSectionModalController as vm',
                        size: 'md',
                        backdrop: 'static',
                        resolve: {
                            isEdit: function () {
                                return true;
                            },
                            section: function () {
                                return angular.copy(section);
                            }
                        }
                    }).result
                        .then(function (result) {
                        _this.modalService.displayNotification("Your section has been uploaded.", "Success", "OK", true);
                    })
                        .catch(function (error) {
                    });
                };
                this.myFirebaseRef.portfolioPageRef.on('value', function (snapshot) {
                    _this.sections = snapshot.val();
                    if (!_this.$scope.$$phase) {
                        _this.$scope.$apply();
                    }
                });
            }
            PortfolioController.$inject = [
                '$scope',
                '$state',
                'LoginService',
                'MyFirebaseRef',
                '$modal',
                'ModalService'
            ];
            return PortfolioController;
        })();
        angular.module('BrieHope').controller('PortfolioController', PortfolioController);
    })(Portfolio = App.Portfolio || (App.Portfolio = {}));
})(App || (App = {}));
//# sourceMappingURL=PortfolioController.js.map