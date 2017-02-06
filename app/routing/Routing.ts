'use strict'

module Routing {
    export class Route {

        constructor(public $stateProvider: ng.ui.IStateProvider, public $urlRouteProvider: ng.ui.IUrlRouterProvider) {
            this.$stateProvider = $stateProvider;
            this.init();
        }

        private init = () => {
            // Main Page - Portfolio
            this.$stateProvider.state('main', {
                url: '/',
                templateUrl: 'app/portfolio/Portfolio.html',
                controller: 'PortfolioController',
                controllerAs: 'vm'
            });

            /* About */
            this.$stateProvider.state('about', {
                url: '/about',
                templateUrl: 'app/about/About.html',
                controller: 'AboutController',
                controllerAs: 'vm'
            });

            /* Contact */
            this.$stateProvider.state('contact', {
                url: '/contact',
                templateUrl: 'app/contact/Contact.html',
                controller: 'ContactController',
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