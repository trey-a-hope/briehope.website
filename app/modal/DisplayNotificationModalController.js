var App;
(function (App) {
    var Modal;
    (function (Modal) {
        var DisplayNotificationModalController = (function () {
            function DisplayNotificationModalController($modalInstance, notificationMessage, header, acknowledgeButtonText, success) {
                var _this = this;
                this.$modalInstance = $modalInstance;
                this.notificationMessage = notificationMessage;
                this.header = header;
                this.acknowledgeButtonText = acknowledgeButtonText;
                this.success = success;
                this.acknowledge = function () {
                    _this.$modalInstance.close();
                };
            }
            DisplayNotificationModalController.$inject = ['$modalInstance', 'notificationMessage', 'header', 'acknowledgeButtonText', 'success'];
            return DisplayNotificationModalController;
        })();
        angular.module('BrieHope').controller('DisplayNotificationModalController', DisplayNotificationModalController);
    })(Modal = App.Modal || (App.Modal = {}));
})(App || (App = {}));
//# sourceMappingURL=DisplayNotificationModalController.js.map