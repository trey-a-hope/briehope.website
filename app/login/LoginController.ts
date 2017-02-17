module App.Login { 
    import LoginService = App.Services.LoginService;
    import ModalService = App.Services.ModalService;

    class LoginController {
        passcode: string;
        answer: string;

        static $inject = ['$scope', 'ModalService', 'LoginService'];
        constructor(public $scope: any, public modalService: ModalService, public loginService: LoginService){
            this.getPasscode();
        }

        getPasscode = (): void =>{
            this.answer = '1234';
        }


        login = (): void =>{
            if(this.passcode == this.answer){
                this.loginService.login();
                console.log(this.loginService.isLoggedIn());
                this.modalService.displayNotification("Loggin in.", "Success", "OK", true);
            }else{
                this.modalService.displayNotification("Login info is incorrect.", "Sorry", "OK", false);
            }
        }
    }
    angular.module('BrieHope').controller('LoginController', LoginController);
}