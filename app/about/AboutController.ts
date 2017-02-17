module App.Portfolio {
    import LoginService = App.Services.LoginService;
    import ModalService = App.Services.ModalService;
    import MyFirebaseRef = App.Services.MyFirebaseRef;
    class AboutController {
        title1: string;
        paragraph1: string;

        title1IsEditting: boolean = false;
        paragraph1IsEditting: boolean = false;

        static $inject = ['$scope', 'MyFirebaseRef', 'ModalService', 'LoginService'];
        constructor(public $scope: any, public myFirebaseRef: MyFirebaseRef, public modalService: ModalService, public loginService: LoginService) {
            this.setUI();
        }

        setUI = (): void =>{
            /* Title 1 */
            this.myFirebaseRef.aboutPageRef.child('Title1').on('value', (snapshot: any) => {
                this.title1 = snapshot.val();
                /* Refresh UI. */
                if(!this.$scope.$$phase){
                    this.$scope.$apply();
                }
            });

            /* Paragraph 1 */
            this.myFirebaseRef.aboutPageRef.child('Paragraph1').on('value', (snapshot: any) => {
                this.paragraph1 = snapshot.val();
                /* Refresh UI. */
                if(!this.$scope.$$phase){
                    this.$scope.$apply();
                }
            });
        }

        toggleEdit = (section: number): void =>{
            switch(section){
                case Section.Title1:
                    if(this.title1IsEditting){
                        this.myFirebaseRef.aboutPageRef.child('Title1').set(this.title1);
                    }
                    this.title1IsEditting = !this.title1IsEditting;
                    break;
                case Section.Paragraph1:
                    if(this.paragraph1IsEditting){
                        this.myFirebaseRef.aboutPageRef.child('Paragraph1').set(this.paragraph1);
                    }
                    this.paragraph1IsEditting = !this.paragraph1IsEditting;
                    break;
                default:
                    break;
            }
        }
    }

    enum Section{
        Title1,
        Paragraph1
    }

    angular.module('BrieHope').controller('AboutController', AboutController);
}