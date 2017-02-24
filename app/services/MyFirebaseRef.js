var App;
(function (App) {
    var Services;
    (function (Services) {
        var MyFirebaseRef = (function () {
            function MyFirebaseRef() {
                this.config = ({
                    apiKey: 'AIzaSyDFgSFOCn37Z1IpXXool4pBqoQKEloeY1s',
                    authDomain: 'brieportfolio-addc1.firebaseapp.com',
                    databaseURL: 'https://brieportfolio-addc1.firebaseio.com',
                    storageBucket: 'brieportfolio-addc1.appspot.com'
                });
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
            return MyFirebaseRef;
        })();
        Services.MyFirebaseRef = MyFirebaseRef;
        angular.module('BrieHope').service('MyFirebaseRef', MyFirebaseRef);
    })(Services = App.Services || (App.Services = {}));
})(App || (App = {}));
//# sourceMappingURL=MyFirebaseRef.js.map