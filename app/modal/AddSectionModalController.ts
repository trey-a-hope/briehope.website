module App.Modal {
    import Image = App.Models.Image;
    import MyFirebaseRef = App.Services.MyFirebaseRef;

    class AddSectionModalController {
        image = new Image(); 

        static $inject = [
            '$scope',
            '$modalInstance',
            'MyFirebaseRef'
        ];
        constructor(public $scope: any, public $modalInstance: angular.ui.bootstrap.IModalServiceInstance, public myFirebaseRef: MyFirebaseRef) {
        }

        save = (): void => {
            var fileChooser: any = document.getElementById('file-chooser');     
            var file = fileChooser.files[0]; 

            //Get reference to new insertion of camp.
            var newpostref = this.myFirebaseRef.portfolioPageRef.push().key; 
            this.image.id = newpostref;

            if (file) {
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
                //TODO:
            }
        }

        cancel = (): void => {
            this.$scope.$dismiss(false);
        }

    }
    angular.module('BrieHope').controller('AddSectionModalController', AddSectionModalController);
} 