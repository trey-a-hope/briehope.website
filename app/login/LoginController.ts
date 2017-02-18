module App.Login { 
    import LoginService = App.Services.LoginService;
    import ModalService = App.Services.ModalService;
    import MyFirebaseRef = App.Services.MyFirebaseRef;

    class LoginController {
        passcode: string;
        answer: string;

        static $inject = [
            '$scope', 
            'ModalService', 
            'LoginService', 
            'MyFirebaseRef', 
            '$state'
        ];
        constructor(public $scope: ng.IScope, public modalService: ModalService, public loginService: LoginService, public myFirebaseRef: MyFirebaseRef, public $state: ng.ui.IStateService){
            /* Get title. */
            this.myFirebaseRef.loginPageRef.child('Passcode').on('value', (snapshot: any) => {
                this.answer = snapshot.val();
                /* Refresh UI. */
                if(!this.$scope.$$phase){
                    this.$scope.$apply();
                }
            });
        }

        login = (): void =>{
            if(this.passcode == this.answer){
                this.loginService.login();
                this.modalService.displayNotification("Welcome Brie, you're now logged in. Your session will end when the page refreshes.", "Success", "OK", true);
                /* Proceed to the landing page. */
                this.$state.go('intro');
            }else{
                this.modalService.displayNotification("Login info is incorrect.", "Sorry", "OK", false);
            }
        }
    }
    angular.module('BrieHope').controller('LoginController', LoginController);
}