module App.Modal {
    import Image = App.Models.Image;
    import ModalService = App.Services.ModalService;
    import MyFirebaseRef = App.Services.MyFirebaseRef;

    class AddPhotoModalController {
        photo: Image = new Image();

        static $inject = [
            '$scope',
            '$modalInstance',
            'MyFirebaseRef',
            'section',
            'isEdit',
            'photo',
            'ModalService'
        ];
        constructor(public $scope: any, 
                    public $modalInstance: angular.ui.bootstrap.IModalServiceInstance, 
                    public myFirebaseRef: MyFirebaseRef, 
                    public section: Image,
                    public isEdit: boolean,
                    public _photo: Image,
                    public modalService: ModalService) {
            if(this.isEdit){
                this.photo = _photo;
            }
        }

        save = (): void => {
            var fileChooser: any = document.getElementById('file-chooser');     
            var file = fileChooser.files[0]; 

            //Get reference to new insertion of camp.
            var newpostref = this.myFirebaseRef.portfolioPageRef.child(this.section.id + '/photos').push().key; 
            this.photo.id = newpostref;

            if (this.photo.name && this.photo.subText && file) {
                var uploadTask = this.myFirebaseRef.storageRef.child("PortfolioPage/" + this.photo.id).put(file);
                uploadTask.on('state_changed', 
                    (snapshot: any) => {
                    }, (error: any) => {
                    }, (success: any) => {
                        var downloadURL = uploadTask.snapshot.downloadURL;
                        this.photo.url = downloadURL;
                        this.myFirebaseRef.portfolioPageRef.child(this.section.id + '/photos/' + this.photo.id).update(this.photo);
                        this.$modalInstance.close();
                    });
            }
            else {
                this.modalService.displayNotification("Some info is incomplete.", "Cannot Save", "OK", false);
            }
        }

        update = (): void => {
            var fileChooser: any = document.getElementById('file-chooser');     
            var file = fileChooser.files[0]; 

            if(this.photo.name && this.photo.subText){
                if(file){
                    var uploadTask = this.myFirebaseRef.storageRef.child("PortfolioPage/" + this.photo.id).put(file);
                    uploadTask.on('state_changed', 
                        (snapshot: any) => {
                        }, (error: any) => {
                        }, (success: any) => {
                            var downloadURL = uploadTask.snapshot.downloadURL;
                            this.photo.url = downloadURL;
                            this.myFirebaseRef.portfolioPageRef.child(this.section.id + '/photos/' + this.photo.id).update(this.photo);
                            this.$modalInstance.close();
                        });
                }else{
                    this.myFirebaseRef.portfolioPageRef.child(this.section.id + '/photos/' + this.photo.id).update(this.photo);
                    this.$modalInstance.close();
                }
            }else{
                this.modalService.displayNotification("Must enter name and subtext for phone.", "Cannot Save", "OK", false);
            }
        }

        cancel = (): void => {
            this.$scope.$dismiss(false);
        }

    }
    angular.module('BrieHope').controller('AddPhotoModalController', AddPhotoModalController);
} 