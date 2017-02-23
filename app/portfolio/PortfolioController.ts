module App.Portfolio {
    import Image = App.Models.Image;
    import LoginService = App.Services.LoginService;
    import ModalService = App.Services.ModalService;
    import MyFirebaseRef = App.Services.MyFirebaseRef;

    class PortfolioController {
        sections: Array<Image> = new Array<Image>();

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
                this.sections = snapshot.val();
                if(!this.$scope.$$phase){
                    this.$scope.$apply();
                }
            });
        }

        selectImage = (section: Image): void => {
            this.$state.go('full-portfolio', {
                section: section
            });
        }

        addSection = (): void => {
            this.$modal.open({
                templateUrl: 'app/modal/AddSectionModalTemplate.html',
                controller: 'AddSectionModalController as vm',
                size: 'md',
                backdrop: 'static',
                resolve: {
                    isEdit: (): boolean => {
                        return false;
                    },
                    section: (): Image => {
                        return null;
                    }
                }
            }).result
                .then((result: any) =>{
                    this.modalService.displayNotification("Your section has been uploaded.", "Success", "OK", true);
                })
                .catch((error: any) =>{
                });
        }

        deleteSection = (section: Image): void =>{
            this.modalService.displayConfirmation("Are you sure you want to delete the " + section.name + " section?", "Delete", "Yes", false)
                .then((result: any) => {
                    this.myFirebaseRef.portfolioPageRef.child(section.id).remove();
                    angular.forEach(section.photos, (photo: Image, index: number) => {
                        this.myFirebaseRef.storageRef.child('PortfolioPage/' + photo.id).delete()
                    });
                    this.myFirebaseRef.storageRef.child('PortfolioPage/' + section.id).delete()
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

        editSection = (section: Image): void => {
            this.$modal.open({
                templateUrl: 'app/modal/AddSectionModalTemplate.html',
                controller: 'AddSectionModalController as vm',
                size: 'md',
                backdrop: 'static',
                resolve: {
                    isEdit: (): boolean => {
                        return true;
                    },
                    section: (): Image => {
                        return section;
                    }
                }
            }).result
                .then((result: any) =>{
                    this.modalService.displayNotification("Your section has been uploaded.", "Success", "OK", true);
                })
                .catch((error: any) =>{
                });
        }
    }

    angular.module('BrieHope').controller('PortfolioController', PortfolioController);
}