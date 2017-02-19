module CampCentral.Modal {
    class DisplayConfirmationModalController {

        static $inject = ['$scope', 'confirmationMessage', 'confirmationHeader', 'confirmButtonText', 'deferred', 'success'];
        constructor(public $scope: any, public confirmationMessage: string, public confirmationHeader: string, public confirmButtonText: string, public deferred: any, public success: boolean) {
        }

        confirm = () => {
            this.deferred.resolve();
            this.$scope.$close(true);
        }

        cancel = () => {
            this.deferred.reject();
            this.$scope.$dismiss(false);
        }
    }

    angular.module('BrieHope').controller('DisplayConfirmationModalController', DisplayConfirmationModalController);
}
