declare module Routing {
    class Route {
        $stateProvider: ng.ui.IStateProvider;
        $urlRouteProvider: ng.ui.IUrlRouterProvider;
        constructor($stateProvider: ng.ui.IStateProvider, $urlRouteProvider: ng.ui.IUrlRouterProvider);
        private init;
    }
}
