var Routing;
(function (Routing) {
    var Route = (function () {
        function Route($stateProvider, $urlRouteProvider) {
            this.$stateProvider = $stateProvider;
            this.$urlRouteProvider = $urlRouteProvider;
            this.$stateProvider = $stateProvider;
            this.$stateProvider.state('intro', {
                url: '/intro',
                templateUrl: 'app/landing/Landing.html',
                controller: 'LandingController',
                controllerAs: 'vm'
            });
            this.$stateProvider.state('portfolio', {
                url: '/portfolio',
                templateUrl: 'app/portfolio/Portfolio.html',
                controller: 'PortfolioController',
                controllerAs: 'vm'
            });
            this.$stateProvider.state('full-portfolio', {
                url: '/full-portfolio',
                templateUrl: 'app/portfolio/FullPortfolio.html',
                controller: 'FullPortfolioController',
                controllerAs: 'vm',
                params: {
                    section: null
                }
            });
            this.$stateProvider.state('about', {
                url: '/about',
                templateUrl: 'app/about/About.html',
                controller: 'AboutController',
                controllerAs: 'vm'
            });
            this.$stateProvider.state('contact', {
                url: '/contact',
                templateUrl: 'app/contact/Contact.html',
                controller: 'ContactController',
                controllerAs: 'vm'
            });
            this.$stateProvider.state('login', {
                url: '/login',
                templateUrl: 'app/login/Login.html',
                controller: 'LoginController',
                controllerAs: 'vm'
            });
            this.$urlRouteProvider.otherwise('/intro');
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