module App.Directives {
    class OnEnter implements ng.IDirective {

        public link: any;    

		restrict = 'A';
		scope = false;

		constructor() {
			this.link = this.unboundLink.bind(this);
		}

		unboundLink(scope: angular.IScope, element: JQuery, attributes: any) {
			element.bind('keydown keypress', (event: JQueryEventObject) => {
				if (event.which === 13) {
					scope.$apply(() =>  {
						scope.$eval(attributes.onEnter);
					});
					event.preventDefault();
				}
			});
		}

		static instance(): ng.IDirectiveFactory {
			var directive = () => new OnEnter();
			directive.$inject = [];
			return directive;
        }
    }
    angular.module('BrieHope').directive('onEnter', OnEnter.instance());
}