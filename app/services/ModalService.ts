'use strict'

module App.Services {
    /*
        Modal Service: Handles simple modal displaying.
    */
    export class ModalService {

        static $inject = ['$modal', '$q'];
        constructor(public $modal: ng.ui.bootstrap.IModalService, public $q: ng.IQService) { }

        displayNotification = (notificationMessage: string, header: string, acknowledgeButtonText: string, success?: boolean) => {
            this.$modal.open({
                templateUrl: 'app/modal/DisplayNotificationModalTemplate.html',
                controller: 'DisplayNotificationModalController as vm',
                size: 'md',
                backdrop: 'static',
                resolve: {
                    notificationMessage: () => {
                        return notificationMessage;
                    },
                    header: () => {
                        return header;
                    },
                    acknowledgeButtonText: () => {
                        return acknowledgeButtonText;
                    },
                    success: () =>{
                        return success;
                    }
                }
            });
        }
    }

    angular.module('BrieHope').service('ModalService', ModalService);
}