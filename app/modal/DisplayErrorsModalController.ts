module App.Modal {
    class DisplayErrorsModalController {
        static $inject = [
            '$modalInstance', 
            'errors'
        ];
        constructor(public $modalInstance: angular.ui.bootstrap.IModalServiceInstance, public errors: Array<string>) {
        }

        acknowledge = (): void => {
            this.$modalInstance.close();
        }
    }

    angular.module('BrieHope').controller('DisplayErrorsModalController', DisplayErrorsModalController);
}