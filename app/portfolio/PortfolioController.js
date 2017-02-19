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
                this.images = new Array();
                this.selectImage = function (image) {
                    alert(image.name);
                };
                this.addSection = function () {
                    _this.$modal.open({
                        templateUrl: 'app/modal/AddSectionModalTemplate.html',
                        controller: 'AddSectionModalController as vm',
                        size: 'md',
                        backdrop: 'static'
                    }).result
                        .then(function (result) {
                        _this.modalService.displayNotification("Your section has been uploaded.", "Success", "OK", true);
                    })
                        .catch(function (error) {
                    });
                };
                this.deleteSection = function (image) {
                    _this.modalService.displayConfirmation("Are you sure you want to delete the " + image.name + " section?", "Delete", "Yes", false)
                        .then(function (result) {
                        _this.myFirebaseRef.portfolioPageRef.child(image.id).remove();
                        _this.myFirebaseRef.storageRef.child('PortfolioPage/' + image.id).delete()
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
                this.myFirebaseRef.portfolioPageRef.on('value', function (snapshot) {
                    _this.images = snapshot.val();
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