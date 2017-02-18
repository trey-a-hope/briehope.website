module App.Modal {
    class DisplayNotificationModalController {
        static $inject = [
            '$modalInstance', 
            'notificationMessage', 
            'header', 
            'acknowledgeButtonText', 
            'success'
        ];
        constructor(public $modalInstance: angular.ui.bootstrap.IModalServiceInstance, public notificationMessage: string, public header: string, public acknowledgeButtonText: string, public success: boolean) {
        }

        acknowledge = (): void => {
            this.$modalInstance.close();
        }
    }

    angular.module('BrieHope').controller('DisplayNotificationModalController', DisplayNotificationModalController);
}