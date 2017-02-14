module App.Portfolio {
    import ModalService = App.Services.ModalService;
    import MyFirebaseRef = App.Services.MyFirebaseRef;
    class ContactController {
        name: string;
        email: string;
        message: string;
        resumeHyperlink: string;
        static $inject = ['$scope', '$http', 'MyFirebaseRef', 'ModalService'];
        constructor(public $scope: any, public $http: any, public myFirebaseRef: MyFirebaseRef, public modalService: ModalService) {
            /* Get hyperlink to resume. */
            this.myFirebaseRef.contactPageRef.child('Resume').on('value', (snapshot: any) => {
                this.resumeHyperlink = snapshot.val();
                /* Refresh UI. */
                this.$scope.$apply();
            });
        }

        sendEmail = (form: any): void =>{
            var data = {
                name: this.name,
                email: this.email,
                message: this.message
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

        uploadPDF = (): void =>{
            var fileChooser:any = document.getElementById('file-chooser');     
            var file = fileChooser.files[0]; 
            if (file) {
                var uploadTask = this.myFirebaseRef.storageRef.child("Documents/PDFs/Resume").put(file);
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
    }

    angular.module('BrieHope').controller('ContactController', ContactController);
}