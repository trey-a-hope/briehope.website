declare module App.Services {
    class ModalService {
        $modal: ng.ui.bootstrap.IModalService;
        $q: ng.IQService;
        static $inject: string[];
        constructor($modal: ng.ui.bootstrap.IModalService, $q: ng.IQService);
        displayNotification: (notificationMessage: string, header: string, acknowledgeButtonText: string, success?: boolean) => void;
    }
}
