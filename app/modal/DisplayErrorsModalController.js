var App;
(function (App) {
    var Modal;
    (function (Modal) {
        var DisplayErrorsModalController = (function () {
            function DisplayErrorsModalController($modalInstance, errors) {
                var _this = this;
                this.$modalInstance = $modalInstance;
                this.errors = errors;
                this.acknowledge = function () {
                    _this.$modalInstance.close();
                };
            }
            DisplayErrorsModalController.$inject = [
                '$modalInstance',
                'errors'
            ];
            return DisplayErrorsModalController;
        })();
        angular.module('BrieHope').controller('DisplayErrorsModalController', DisplayErrorsModalController);
    })(Modal = App.Modal || (App.Modal = {}));
})(App || (App = {}));
//# sourceMappingURL=DisplayErrorsModalController.js.map