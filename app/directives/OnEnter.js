var App;
(function (App) {
    var Directives;
    (function (Directives) {
        var OnEnter = (function () {
            function OnEnter() {
                this.restrict = 'A';
                this.scope = false;
                this.link = this.unboundLink.bind(this);
            }
            OnEnter.prototype.unboundLink = function (scope, element, attributes) {
                element.bind('keydown keypress', function (event) {
                    if (event.which === 13) {
                        scope.$apply(function () {
                            scope.$eval(attributes.onEnter);
                        });
                        event.preventDefault();
                    }
                });
            };
            OnEnter.instance = function () {
                var directive = function () { return new OnEnter(); };
                directive.$inject = [];
                return directive;
            };
            return OnEnter;
        })();
        angular.module('BrieHope').directive('onEnter', OnEnter.instance());
    })(Directives = App.Directives || (App.Directives = {}));
})(App || (App = {}));
//# sourceMappingURL=OnEnter.js.map