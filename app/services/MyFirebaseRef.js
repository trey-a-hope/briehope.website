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