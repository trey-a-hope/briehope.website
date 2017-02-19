module App.Portfolio {
    import LoginService = App.Services.LoginService;
    import ModalService = App.Services.ModalService;
    import MyFirebaseRef = App.Services.MyFirebaseRef;
    
    class ContactController {
        /* Input Fields */
        name: string;
        email: string;
        phoneNumber: string;
        message: string;
        /* Links */
        resumeHyperlink: string;
        /* Regex */
        phoneNumberRegex: string;
        emailRegex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        static $inject = [
            '$scope', 
            '$http', 
            'MyFirebaseRef', 
            'ModalService', 
            'LoginService'
        ];
        constructor(public $scope: ng.IScope, public $http: any, public myFirebaseRef: MyFirebaseRef, public modalService: ModalService, public loginService: LoginService) {
            /* Get hyperlink to resume. */
            this.myFirebaseRef.contactPageRef.child('Resume').on('value', (snapshot: any) => {
                this.resumeHyperlink = snapshot.val();
                /* Refresh UI. */
                if(!this.$scope.$$phase){
                    this.$scope.$apply();
                }
            });
        }

        sendEmail = (form: any): void =>{
            if(form.$valid)
            {
                var data = {
                    name:           this.name,
                    email:          this.email,
                    phoneNumber:    this.phoneNumber,
                    message:        this.message
                }
                
                this.$http({			
                    method: 'POST',			
                    url: 'php/sendEmail.php',			
                    data: data,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}		
                }).success((result: any) => {	
                    this.modalService.displayNotification('Message sent, I will respond shortly.', 'Got It', 'OK', true);
                }).error((error: any) => {
                    this.modalService.displayNotification(error.message, 'Error', 'OK', false);
                });	
            }
            else
            {
                this.modalService.displayNotification('Some fields are incorrect/empty.', 'Error', 'OK', false);
            }

        }

        uploadPDF = (): void =>{
            var fileChooser:any = document.getElementById('file-chooser');     
            var file = fileChooser.files[0]; 
            if (file) {
                var uploadTask = this.myFirebaseRef.storageRef.child("ContactPage/Resume").put(file);
                uploadTask.on('state_changed', 
                    (snapshot: any) => {
                    }, (error: any) => {
                        this.modalService.displayNotification(error.message, 'Error', 'OK', false);
                    }, (success: any) => {
                        var downloadURL = uploadTask.snapshot.downloadURL;
                        this.myFirebaseRef.contactPageRef.child('Resume').set(downloadURL);
                        this.modalService.displayNotification('Resume uploaded successfully.', "Success", "OK", true);
                    });
            }
            else {
                this.modalService.displayNotification('Must upload a PDF', 'Error', 'OK', false);
            }
        }

        editEmail = (): void => {
            if(this.loginService.isLoggedIn()){
                alert("Edit Email");
            }
        }

        editPhoneNumber = (): void => {
            if(this.loginService.isLoggedIn()){
                alert("Edit Phone Number");
            }
        }
    }
    angular.module('BrieHope').controller('ContactController', ContactController);
}