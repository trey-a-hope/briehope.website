module App.Services {
    
    export class ModalService {

        static $inject = [
            '$modal', 
            '$q'
        ];
        constructor(private $modal: ng.ui.bootstrap.IModalService, private $q: ng.IQService) { }

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

        displayConfirmation = (confirmationMessage: string, confirmationHeader: string, confirmButtonText: string, success?: boolean) => {
           var deferred = this.$q.defer<boolean>();
           this.$modal.open({
               templateUrl: 'app/modal/DisplayConfirmationModalTemplate.html',
               controller: 'DisplayConfirmationModalController as vm',
               size: 'md',
               backdrop: 'static',
               resolve: {
                   deferred: () => {
                       return deferred;
                   },
                   confirmationMessage: () => {
                       return confirmationMessage;
                   },
                   confirmationHeader: () => {
                       return confirmationHeader;
                   },
                   confirmButtonText: () => {
                       return confirmButtonText;
                   },
                   success: () =>{
                       return success;
                   }
               }
           });

           return deferred.promise;
       }

       displayErrors = (errors: Array<string>) => {
            this.$modal.open({
                templateUrl: 'app/modal/DisplayErrorsModalTemplate.html',
                controller: 'DisplayErrorsModalController as vm',
                size: 'md',
                backdrop: 'static',
                resolve: {
                    errors: () => {
                        return errors;
                    }
                }
            });
        }
    }

    angular.module('BrieHope').service('ModalService', ModalService);
}