declare module App.Services {
    class ModalService {
        $modal: ng.ui.bootstrap.IModalService;
        $q: ng.IQService;
        static $inject: string[];
        constructor($modal: ng.ui.bootstrap.IModalService, $q: ng.IQService);
        displayNotification: (notificationMessage: string, header: string, acknowledgeButtonText: string, success?: boolean) => void;
        displayConfirmation: (confirmationMessage: string, confirmationHeader: string, confirmButtonText: string, success?: boolean) => ng.IPromise<boolean>;
    }
}
