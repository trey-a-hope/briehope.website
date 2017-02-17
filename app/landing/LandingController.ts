module App.Landing {
    import LoginService = App.Services.LoginService;
    import MyFirebaseRef = App.Services.MyFirebaseRef;
    class LandingController {
        title: string;
        subTitle: string;

        titleIsEditting: boolean = false;
        subTitleIsEditting: boolean = false;

        static $inject = ['$scope', '$state', 'MyFirebaseRef', 'LoginService'];
        constructor(public $scope: any, public $state: any, public myFirebaseRef: MyFirebaseRef, public loginService: LoginService) {
            /* Get title. */
            this.myFirebaseRef.landingPageRef.child('Title').on('value', (snapshot: any) => {
                this.title = snapshot.val();
                /* Refresh UI. */
                this.$scope.$apply();
            });
            /* Get subtitle. */
            this.myFirebaseRef.landingPageRef.child('SubTitle').on('value', (snapshot: any) => {
                this.subTitle = snapshot.val();
                /* Refresh UI. */
                this.$scope.$apply();
            });
        }

        enter = (): void =>{
            this.$state.go('portfolio');
        }

        toggleEdit = (section: number): void =>{
            switch(section){
                case Section.Title:
                    if(this.titleIsEditting){
                        this.myFirebaseRef.landingPageRef.child('Title').set(this.title);
                    }
                    this.titleIsEditting = !this.titleIsEditting;
                    break;
                case Section.SubTitle:
                    if(this.subTitleIsEditting){
                        this.myFirebaseRef.landingPageRef.child('SubTitle').set(this.subTitle);
                    }
                    this.subTitleIsEditting = !this.subTitleIsEditting;
                    break;
                default:
                    break;
            }
        }
        
    }

    enum Section{
        Title,
        SubTitle
    }

    angular.module('BrieHope').controller('LandingController', LandingController);
}