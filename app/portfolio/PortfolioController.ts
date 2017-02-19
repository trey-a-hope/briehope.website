module App.Portfolio {
    import Image = App.Models.Image;
    import LoginService = App.Services.LoginService;
    import ModalService = App.Services.ModalService;
    import MyFirebaseRef = App.Services.MyFirebaseRef;

    class PortfolioController {
        images: Array<Image> = new Array<Image>();

        static $inject = [
            '$scope', 
            '$state', 
            'LoginService', 
            'MyFirebaseRef',
            '$modal',
            'ModalService'
        ];  
        constructor(public $scope: ng.IScope, public $state: ng.ui.IStateService, public loginService: LoginService, public myFirebaseRef: MyFirebaseRef,
            public $modal: ng.ui.bootstrap.IModalService, public modalService: ModalService) {
            this.myFirebaseRef.portfolioPageRef.on('value', (snapshot: any) => {
                this.images = snapshot.val();
                if(!this.$scope.$$phase){
                    this.$scope.$apply();
                }
            });
        }

        selectImage = (image: Image): void =>{
            alert(image.name);
        }

        addSection = (): void =>{
            this.$modal.open({
                templateUrl: 'app/modal/AddSectionModalTemplate.html',
                controller: 'AddSectionModalController as vm',
                size: 'md',
                backdrop: 'static'
            }).result
                .then((result: any) =>{
                    this.modalService.displayNotification("Your section has been uploaded.", "Success", "OK", true);
                })
                .catch((error: any) =>{
                });
        }

        deleteSection = (image: Image): void =>{
            this.modalService.displayConfirmation("Are you sure you want to delete the " + image.name + " section?", "Delete", "Yes", false)
                .then((result: any) => {
                    this.myFirebaseRef.portfolioPageRef.child(image.id).remove();
                    this.myFirebaseRef.storageRef.child('PortfolioPage/' + image.id).delete()
                        .then((result: any) => {
                            this.modalService.displayNotification("Section deleted successfully.", "Success", "OK", true);
                        })
                        .catch((error: any) => {
                            this.modalService.displayNotification(error.message, "Error", "OK", false);
                        });
                })
                .catch((error: any) => {

                })
                .finally(() => {

                });
        }
    }

    angular.module('BrieHope').controller('PortfolioController', PortfolioController);
}