module App.Portfolio {
    import Image = App.Models.Image;
    import LoginService = App.Services.LoginService;
    import ModalService = App.Services.ModalService;
    import MyFirebaseRef = App.Services.MyFirebaseRef;

    class FullPortfolioController {
        section: Image;
        photos: Array<Image> = new Array<Image>();

        static $inject = [
            '$scope', 
            '$state', 
            'LoginService', 
            'MyFirebaseRef',
            '$modal',
            'ModalService',
            '$stateParams'
        ];  
        constructor(public $scope: ng.IScope, public $state: any, public loginService: LoginService, public myFirebaseRef: MyFirebaseRef,
            public $modal: ng.ui.bootstrap.IModalService, public modalService: ModalService, public $stateParams: ng.ui.IStateParamsService) {
                if(this.$state.params.section == null){
                    this.$state.go('portfolio');
                }else{
                    this.section = this.$state.params.section;
                }
                this.myFirebaseRef.portfolioPageRef.child(this.section.id + '/photos').on('value', (snapshot: any) => {
                    this.photos = snapshot.val();
                    if(!this.$scope.$$phase){
                        this.$scope.$apply();
                    }
                });
        } 

        addPhoto = (): void => {
            this.$modal.open({
                templateUrl: 'app/modal/AddPhotoModalTemplate.html',
                controller: 'AddPhotoModalController as vm',
                size: 'md',
                backdrop: 'static',
                resolve: {
                    section: (): Image => {
                        return this.section;
                    },
                    isEdit: (): boolean => {
                        return false;
                    },
                    photo: (): Image => {
                        return null;
                    }
                }
            }).result
                .then((result: any) =>{
                    this.modalService.displayNotification("Your photo has been uploaded.", "Success", "OK", true);
                })
                .catch((error: any) =>{
                });
        }

        editImage = (photo: Image): void => {
            this.$modal.open({
                templateUrl: 'app/modal/AddPhotoModalTemplate.html',
                controller: 'AddPhotoModalController as vm',
                size: 'md',
                backdrop: 'static',
                resolve: {
                    section: (): Image => {
                        return this.section;
                    },
                    isEdit: (): boolean => {
                        return true;
                    },
                    photo: (): Image => {
                        return angular.copy(photo);
                    }
                }
            }).result
                .then((result: any) =>{
                    this.modalService.displayNotification("Your photo has been uploaded.", "Success", "OK", true);
                })
                .catch((error: any) =>{
                });
        }

        deleteImage = (photo: Image): void => {
            this.modalService.displayConfirmation("Are you sure you want to delete the " + photo.name + " photo?", "Delete", "Yes", false)
                .then((result: any) => {
                    this.myFirebaseRef.portfolioPageRef.child(this.section.id + '/photos/' + photo.id).remove();
                    this.myFirebaseRef.storageRef.child('PortfolioPage/' + photo.id).delete()
                        .then((result: any) => {
                            this.modalService.displayNotification("Photo deleted successfully.", "Success", "OK", true);
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

    angular.module('BrieHope').controller('FullPortfolioController', FullPortfolioController);
}