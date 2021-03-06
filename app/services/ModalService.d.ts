declare module App.Services {
    class ModalService {
        private $modal;
        private $q;
        static $inject: string[];
        constructor($modal: ng.ui.bootstrap.IModalService, $q: ng.IQService);
        displayNotification: (notificationMessage: string, header: string, acknowledgeButtonText: string, success?: boolean) => void;
        displayConfirmation: (confirmationMessage: string, confirmationHeader: string, confirmButtonText: string, success?: boolean) => ng.IPromise<boolean>;
        displayErrors: (errors: string[]) => void;
    }
}
