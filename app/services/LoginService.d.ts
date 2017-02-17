declare module App.Services {
    class LoginService {
        private loggedIn;
        constructor();
        login: () => void;
        logout: () => void;
        isLoggedIn: () => boolean;
    }
}
