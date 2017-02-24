module App.Landing {
    import LoginService = App.Services.LoginService;
    import ModalService = App.Services.ModalService;
    import MyFirebaseRef = App.Services.MyFirebaseRef;

    class LandingController {
        title: string;
        subTitle: string;
        buttonText: string;
        titleIsEditting: boolean = false;
        subTitleIsEditting: boolean = false;
        buttonIsEditting: boolean = false;
        passcode: string;

        static $inject = [
            '$scope', 
            '$state', 
            'MyFirebaseRef', 
            'LoginService', 
            'ModalService'
        ];
        constructor(public $scope: ng.IScope, public $state: any, public myFirebaseRef: MyFirebaseRef, public loginService: LoginService, public modalService: ModalService) {
            /* Get title. */
            this.myFirebaseRef.landingPageRef.child('Title').on('value', (snapshot: any) => {
                this.title = snapshot.val();
                /* Refresh UI. */
                if(!this.$scope.$$phase){
                    this.$scope.$apply();
                }
            });
            /* Get subtitle. */
            this.myFirebaseRef.landingPageRef.child('SubTitle').on('value', (snapshot: any) => {
                this.subTitle = snapshot.val();
                /* Refresh UI. */
                if(!this.$scope.$$phase){
                    this.$scope.$apply();
                }
            });
            /* Get passcode. */
            this.myFirebaseRef.loginPageRef.child('Passcode').on('value', (snapshot: any) => {
                this.passcode = snapshot.val();
                /* Refresh UI. */
                if(!this.$scope.$$phase){
                    this.$scope.$apply();
                }
            });
            /* Get button text. */
            this.myFirebaseRef.landingPageRef.child('Button').on('value', (snapshot: any) => {
                this.buttonText = snapshot.val();
                /* Refresh UI. */
                if(!this.$scope.$$phase){
                    this.$scope.$apply();
                }
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
                case Section.Button:
                    if(this.buttonIsEditting){
                        this.myFirebaseRef.landingPageRef.child('Button').set(this.buttonText);
                    }
                    this.buttonIsEditting = !this.buttonIsEditting;
                    break;
                default:
                    break;
            }
        }

        updatePasscode = (): void => {
            if(this.passcode != null && this.passcode.length > 0){
                this.myFirebaseRef.loginPageRef.child("Passcode").set(this.passcode);
                this.modalService.displayNotification("Your passcode has been udpated.", "Success", "OK", true);
            }
        }

        uploadBackgroundImage = (): void => {
            var fileChooser: any = document.getElementById('file-chooser');     
            var file = fileChooser.files[0]; 

            if (file) {
                var uploadTask = this.myFirebaseRef.storageRef.child("MainContainer/BackgroundPicture").put(file);
                uploadTask.on('state_changed', 
                    (snapshot: any) => {}, 
                    (error: any) => {}, 
                    (success: any) => {
                        var downloadURL = uploadTask.snapshot.downloadURL;
                        this.myFirebaseRef.mainContRef.child('BackgroundPicture').set(downloadURL);
                        this.modalService.displayNotification('Image uploaded successfully.', "Success", "OK", true);
                    });
            }
            else {
                this.modalService.displayNotification("Must select picture first.", "Error", "OK", false);
            }
        }
        
    }

    enum Section{
        Title,
        SubTitle,
        Button
    }

    angular.module('BrieHope').controller('LandingController', LandingController);
}