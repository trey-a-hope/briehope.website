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
                this.displayConfirmation = function (confirmationMessage, confirmationHeader, confirmButtonText, success) {
                    var deferred = _this.$q.defer();
                    _this.$modal.open({
                        templateUrl: 'app/modal/DisplayConfirmationModalTemplate.html',
                        controller: 'DisplayConfirmationModalController as vm',
                        size: 'md',
                        backdrop: 'static',
                        resolve: {
                            deferred: function () {
                                return deferred;
                            },
                            confirmationMessage: function () {
                                return confirmationMessage;
                            },
                            confirmationHeader: function () {
                                return confirmationHeader;
                            },
                            confirmButtonText: function () {
                                return confirmButtonText;
                            },
                            success: function () {
                                return success;
                            }
                        }
                    });
                    return deferred.promise;
                };
                this.displayErrors = function (errors) {
                    _this.$modal.open({
                        templateUrl: 'app/modal/DisplayErrorsModalTemplate.html',
                        controller: 'DisplayErrorsModalController as vm',
                        size: 'md',
                        backdrop: 'static',
                        resolve: {
                            errors: function () {
                                return errors;
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