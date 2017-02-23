module App.Modal {
    import Image = App.Models.Image;
    import ModalService = App.Services.ModalService;
    import MyFirebaseRef = App.Services.MyFirebaseRef;

    class AddSectionModalController {
        private image = new Image(); 

        static $inject = [
            '$scope',
            '$modalInstance',
            'MyFirebaseRef',
            'isEdit',
            'section',
            'ModalService'
        ];
        constructor(public $scope: any, 
                    public $modalInstance: angular.ui.bootstrap.IModalServiceInstance, 
                    public myFirebaseRef: MyFirebaseRef, 
                    public isEdit: boolean, 
                    public section: Image,
                    public modalService: ModalService) {
            if(this.isEdit){
                this.image = section;
            }
        }

        update = (): void => {
            var fileChooser: any = document.getElementById('file-chooser');     
            var file = fileChooser.files[0]; 

            if(this.image.name && this.image.subText){
                if(file){
                    var uploadTask = this.myFirebaseRef.storageRef.child("PortfolioPage/" + this.image.id).put(file);
                    uploadTask.on('state_changed', 
                    (snapshot: any) => {
                    }, (error: any) => {
                    }, (success: any) => {
                        var downloadURL = uploadTask.snapshot.downloadURL;
                        this.image.url = downloadURL;
                        this.myFirebaseRef.portfolioPageRef.child(this.image.id).update(this.image);
                        this.$modalInstance.close();
                    });
                }
                else{
                    this.myFirebaseRef.portfolioPageRef.child(this.image.id).update(this.image);
                    this.$modalInstance.close();
                }
            }else{
                this.modalService.displayNotification("Must enter name and subtext for section.", "Cannot Save", "OK", false);
            }
        }

        save = (): void => {
            var fileChooser: any = document.getElementById('file-chooser');     
            var file = fileChooser.files[0]; 

            //Get reference to new insertion of camp.
            var newpostref = this.myFirebaseRef.portfolioPageRef.push().key; 
            this.image.id = newpostref;

            if (this.image.name && this.image.subText && file) {
                var uploadTask = this.myFirebaseRef.storageRef.child("PortfolioPage/" + this.image.id).put(file);
                uploadTask.on('state_changed', 
                    (snapshot: any) => {
                    }, (error: any) => {
                        //TODO:
                    }, (success: any) => {
                        var downloadURL = uploadTask.snapshot.downloadURL;
                        this.image.url = downloadURL;
                        this.myFirebaseRef.portfolioPageRef.child(this.image.id).update(this.image);
                        this.$modalInstance.close();
                    });
            }
            else {
                this.modalService.displayNotification("Some info is incomplete.", "Cannot Save", "OK", false);
            }
        }

        cancel = (): void => {
            this.$scope.$dismiss(false);
        }

    }
    angular.module('BrieHope').controller('AddSectionModalController', AddSectionModalController);
} 