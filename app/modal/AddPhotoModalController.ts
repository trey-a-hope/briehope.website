module App.Modal {
    import Image = App.Models.Image;
    import MyFirebaseRef = App.Services.MyFirebaseRef;

    class AddPhotoModalController {
        photo: Image = new Image();

        static $inject = [
            '$scope',
            '$modalInstance',
            'MyFirebaseRef',
            'section'
        ];
        constructor(public $scope: any, public $modalInstance: angular.ui.bootstrap.IModalServiceInstance, public myFirebaseRef: MyFirebaseRef, public section: Image) {
        }

        save = (): void => {
            var fileChooser: any = document.getElementById('file-chooser');     
            var file = fileChooser.files[0]; 

            //Get reference to new insertion of camp.
            var newpostref = this.myFirebaseRef.portfolioPageRef.child(this.section.id + '/photos').push().key; 
            this.photo.id = newpostref;

            if (file) {
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
                //TODO:
            }
        }

        cancel = (): void => {
            this.$scope.$dismiss(false);
        }

    }
    angular.module('BrieHope').controller('AddPhotoModalController', AddPhotoModalController);
} 