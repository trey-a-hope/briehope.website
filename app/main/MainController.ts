module App.Main {
    import MyFirebaseRef = Services.MyFirebaseRef;

    class MainController{
        backgroundImageUrl: string;
        isOnLandingPage: boolean;

        static $inject = ['$scope', '$state', 'MyFirebaseRef'];
        constructor(public $scope: ng.IScope, public $state: ng.ui.IStateService, public myFirebaseRef: MyFirebaseRef){

            /* Get background image. */
            this.myFirebaseRef.mainContRef.child('BackgroundPicture').on('value', (snapshot: any) => {
                this.backgroundImageUrl = snapshot.val();
                /* Refresh UI. */
                if(!this.$scope.$$phase){
                    this.$scope.$apply();
                }
            });

            this.isOnLandingPage = $state.includes('intro');

            this.$scope.$watch(() => {
                return this.$state.$current.name;
            }, (newVal: any, oldVal: any) => {
                this.isOnLandingPage = $state.includes('intro');
            });
        }

        getStyle = (): any => { return { background: 'url(' + this.backgroundImageUrl + ')' } ; }

    }

    angular.module('BrieHope').controller('MainController', MainController);
}