'use strict'

module Routing {
    export class Route {
        /*	PROPERTIES  */

        /*	CONSTRUCTOR  */
        constructor(public $stateProvider: ng.ui.IStateProvider, public $urlRouteProvider: ng.ui.IUrlRouterProvider) {
            this.$stateProvider = $stateProvider;
            this.init();
        }

        /*	METHODS  */
        private init = () => {
            // Main Page - Portfolio
            this.$stateProvider.state('main', {
                url: '/',
                templateUrl: 'app/portfolio/Portfolio.html',
                controller: 'PortfolioController',
                controllerAs: 'vm'
            });

            this.$urlRouteProvider.otherwise('/');
        }
    }
}

angular.module('BrieHope').config(
    ["$stateProvider", "$urlRouterProvider",
        function($stateProvider: ng.ui.IStateProvider, $urlRouterProvider: ng.ui.IUrlRouterProvider) {
            return new Routing.Route($stateProvider, $urlRouterProvider);
        }]
    );