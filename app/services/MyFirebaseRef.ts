module App.Services {    
    declare var firebase: any;
    export class MyFirebaseRef {
        private config: any = ({
                apiKey: 'AIzaSyDFgSFOCn37Z1IpXXool4pBqoQKEloeY1s',
                authDomain: 'brieportfolio-addc1.firebaseapp.com',
                databaseURL: 'https://brieportfolio-addc1.firebaseio.com',
                storageBucket: 'brieportfolio-addc1.appspot.com'
            });
        private firebase: any;
        private databaseRef: any;
        /* Pages */
        public mainContRef: any;
        public loginPageRef: any;
        public landingPageRef: any;
        public aboutPageRef: any;
        public profilePageRef: any;
        public portfolioPageRef: any;
        public contactPageRef: any;
        /* Storage */
        public storageRef: any;

        constructor() {
            this.firebase = firebase.initializeApp(this.config);
            this.databaseRef = this.firebase.database().ref();
            this.mainContRef = this.databaseRef.child('MainContainer');
            this.loginPageRef = this.databaseRef.child('LoginPage');
            this.landingPageRef = this.databaseRef.child('LandingPage');
            this.aboutPageRef = this.databaseRef.child('AboutPage');
            this.profilePageRef = this.databaseRef.child('ProfilePage');
            this.portfolioPageRef = this.databaseRef.child('PortfolioPage');
            this.contactPageRef = this.databaseRef.child('ContactPage');
            this.storageRef = this.firebase.storage().ref();
        }
    }
    angular.module('BrieHope').service('MyFirebaseRef', MyFirebaseRef);
}