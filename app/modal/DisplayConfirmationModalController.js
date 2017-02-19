var CampCentral;
(function (CampCentral) {
    var Modal;
    (function (Modal) {
        var DisplayConfirmationModalController = (function () {
            function DisplayConfirmationModalController($scope, confirmationMessage, confirmationHeader, confirmButtonText, deferred, success) {
                var _this = this;
                this.$scope = $scope;
                this.confirmationMessage = confirmationMessage;
                this.confirmationHeader = confirmationHeader;
                this.confirmButtonText = confirmButtonText;
                this.deferred = deferred;
                this.success = success;
                this.confirm = function () {
                    _this.deferred.resolve();
                    _this.$scope.$close(true);
                };
                this.cancel = function () {
                    _this.deferred.reject();
                    _this.$scope.$dismiss(false);
                };
            }
            DisplayConfirmationModalController.$inject = ['$scope', 'confirmationMessage', 'confirmationHeader', 'confirmButtonText', 'deferred', 'success'];
            return DisplayConfirmationModalController;
        })();
        angular.module('BrieHope').controller('DisplayConfirmationModalController', DisplayConfirmationModalController);
    })(Modal = CampCentral.Modal || (CampCentral.Modal = {}));
})(CampCentral || (CampCentral = {}));
//# sourceMappingURL=DisplayConfirmationModalController.js.map