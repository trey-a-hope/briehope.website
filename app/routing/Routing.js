'use strict';
var Routing;
(function (Routing) {
    var Route = (function () {
        function Route($stateProvider, $urlRouteProvider) {
            var _this = this;
            this.$stateProvider = $stateProvider;
            this.$urlRouteProvider = $urlRouteProvider;
            this.init = function () {
                _this.$stateProvider.state('main', {
                    url: '/',
                    templateUrl: 'app/portfolio/Portfolio.html',
                    controller: 'PortfolioController',
                    controllerAs: 'vm'
                });
                _this.$urlRouteProvider.otherwise('/');
            };
            this.$stateProvider = $stateProvider;
            this.init();
        }
        return Route;
    })();
    Routing.Route = Route;
})(Routing || (Routing = {}));
angular.module('BrieHope').config(["$stateProvider", "$urlRouterProvider",
    function ($stateProvider, $urlRouterProvider) {
        return new Routing.Route($stateProvider, $urlRouterProvider);
    }]);
//# sourceMappingURL=Routing.js.map