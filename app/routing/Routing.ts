module Routing {
    export class Route {

        constructor(public $stateProvider: ng.ui.IStateProvider, public $urlRouteProvider: ng.ui.IUrlRouterProvider) {
            this.$stateProvider = $stateProvider;

            /* Landing Page */
            this.$stateProvider.state('intro', {
                url:            '/intro',
                templateUrl:    'app/landing/Landing.html',
                controller:     'LandingController',
                controllerAs:   'vm'
            });

            /* Portfolio */
            this.$stateProvider.state('portfolio', {
                url:            '/portfolio',
                templateUrl:    'app/portfolio/Portfolio.html',
                controller:     'PortfolioController',
                controllerAs:   'vm'
            });

            /* Full Portfolio */
            this.$stateProvider.state('full-portfolio', {
                url:            '/full-portfolio',
                templateUrl:    'app/portfolio/FullPortfolio.html',
                controller:     'FullPortfolioController',
                controllerAs:   'vm',
                params: {
                    section: null
                }
            });

            /* About */
            this.$stateProvider.state('about', {
                url:            '/about',
                templateUrl:    'app/about/About.html',
                controller:     'AboutController',
                controllerAs:   'vm'
            });

            /* Contact */
            this.$stateProvider.state('contact', {
                url:            '/contact',
                templateUrl:    'app/contact/Contact.html',
                controller:     'ContactController',
                controllerAs:   'vm'
            });

            /* Login */
            this.$stateProvider.state('login', {
                url:            '/login',
                templateUrl:    'app/login/Login.html',
                controller:     'LoginController',
                controllerAs:   'vm'
            });

            this.$urlRouteProvider.otherwise('/intro');
        }
    }
}

angular.module('BrieHope').config(
    ["$stateProvider", "$urlRouterProvider",
        function($stateProvider: ng.ui.IStateProvider, $urlRouterProvider: ng.ui.IUrlRouterProvider) {
            return new Routing.Route($stateProvider, $urlRouterProvider);
        }]
    );