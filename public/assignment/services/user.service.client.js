/**
 * Created by Siddhesh on 2/13/2017.
 */
(function () {
    angular
        .module("WebAppMaker")
        .factory('UserService', userService);

    function userService($http) {
        var api = {
            "updateUser": updateUser,
            "findUserByCredentials": findUserByCredentials,
            "findUserById": findUserById,
            "findUserByUsername": findUserByUsername,
            "createUser": createUser,
            "deleteUser": deleteUser,
            "login": login,
            "isLoggedIn": isLoggedIn,
            "logout": logout,
            "findCurrentUser": findCurrentUser,
            "register": register
        };
        return api;

        function register(user) {
            return $http.post("/api/register", user);
        }

        function findCurrentUser() {
            return $http.get("/api/user");
        }

        function logout() {
            return $http.post("/api/logout");
        }

        function login(user) {
            return $http.post("/api/login", user);
        }

        function isLoggedIn() {
            return $http.post("/api/isLoggedIn");
        }

        function deleteUser(userId) {
            return $http.delete('/api/user/' + userId);
        }

        function createUser(user) {
            return $http.post("/api/user", user);
        }

        function findUserByUsername(username) {
            return $http.get("/api/user?username=" + username);
        }

        function findUserByCredentials(username, password) {
            return $http.get("/api/user?username=" + username + "&password=" + password);
        }

        function updateUser(userId, updatedUser) {
            return $http.put("/api/user/" + userId, updatedUser);
        }

        function findUserById(userID) {
            return $http.get("/api/user/" + userID);
        }
    }
})();
