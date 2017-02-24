module App.Portfolio {
    import Image = App.Models.Image;
    import LoginService = App.Services.LoginService;
    import ModalService = App.Services.ModalService;
    import MyFirebaseRef = App.Services.MyFirebaseRef;

    class AboutController {
        title1: string;
        paragraph1: string;
        image: Image = new Image();
        test: string = "In Process"

        title1IsEditting: boolean = false;
        paragraph1IsEditting: boolean = false;

        imageDoneDownloading: boolean = false;

        static $inject = [
            '$scope', 
            'MyFirebaseRef', 
            'ModalService', 
            'LoginService'
        ];
        constructor(public $scope: ng.IScope, public myFirebaseRef: MyFirebaseRef, public modalService: ModalService, public loginService: LoginService) {
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
            
            /* Image */
            this.myFirebaseRef.aboutPageRef.child('Image').on('value', (snapshot: any) => {
                this.image = snapshot.val();
                if(!this.$scope.$$phase){
                    this.imageDoneDownloading = true;
                    this.$scope.$apply();
                }
                this.imageDoneDownloading = true;
            });
        }

        toggleEdit = (section: number): void => {
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

        uploadPicture = (): void => {
            var fileChooser: any = document.getElementById('file-chooser');     
            var file = fileChooser.files[0]; 

            //Create image.
            var image = new Image(); 

            if (file) {
                var uploadTask = this.myFirebaseRef.storageRef.child("AboutPage/ProfilePicture").put(file);
                uploadTask.on('state_changed', 
                    (snapshot: any) => {}, 
                    (error: any) => {}, 
                    (success: any) => {
                        var downloadURL = uploadTask.snapshot.downloadURL;
                        image.url = downloadURL;
                        this.myFirebaseRef.aboutPageRef.child('Image').update(image);
                        this.modalService.displayNotification("Image uploaded successfully.", "Success", "OK", true);
                    });
            }
            else {
                this.modalService.displayNotification("Must select picture first.", "Error", "OK", false);
            }
        }
    }

    enum Section {
        Title1,
        Paragraph1
    }

    angular.module('BrieHope').controller('AboutController', AboutController);
}