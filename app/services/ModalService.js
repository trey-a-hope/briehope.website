var App;
(function (App) {
    var Services;
    (function (Services) {
        var ModalService = (function () {
            function ModalService($modal, $q) {
                var _this = this;
                this.$modal = $modal;
                this.$q = $q;
                this.displayNotification = function (notificationMessage, header, acknowledgeButtonText, success) {
                    _this.$modal.open({
                        templateUrl: 'app/modal/DisplayNotificationModalTemplate.html',
                        controller: 'DisplayNotificationModalController as vm',
                        size: 'md',
                        backdrop: 'static',
                        resolve: {
                            notificationMessage: function () {
                                return notificationMessage;
                            },
                            header: function () {
                                return header;
                            },
                            acknowledgeButtonText: function () {
                                return acknowledgeButtonText;
                            },
                            success: function () {
                                return success;
                            }
                        }
                    });
                };
            }
            ModalService.$inject = [
                '$modal',
                '$q'
            ];
            return ModalService;
        })();
        Services.ModalService = ModalService;
        angular.module('BrieHope').service('ModalService', ModalService);
    })(Services = App.Services || (App.Services = {}));
})(App || (App = {}));
//# sourceMappingURL=ModalService.js.map