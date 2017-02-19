module App.Modal {
    import Image = App.Models.Image;
    import MyFirebaseRef = App.Services.MyFirebaseRef;

    class AddSectionModalController {
        name: string;

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

            //Create camp.
            var image = new Image(); 

            //Get reference to new insertion of camp.
            var newpostref = this.myFirebaseRef.portfolioPageRef.push().key; 
            image.id = newpostref; 
            image.name = this.name;

            if (file) {
                var uploadTask = this.myFirebaseRef.storageRef.child("PortfolioPage/" + image.id).put(file);
                uploadTask.on('state_changed', 
                    (snapshot: any) => {
                    }, (error: any) => {
                        //TODO:
                    }, (success: any) => {
                        var downloadURL = uploadTask.snapshot.downloadURL;
                        this.myFirebaseRef.contactPageRef.child('Resume').set(downloadURL);
                        image.url = downloadURL;
                        this.myFirebaseRef.portfolioPageRef.child(image.id).update(image);
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