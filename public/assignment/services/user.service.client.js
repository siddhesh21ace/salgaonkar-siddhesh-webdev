/**
 * Created by Siddhesh on 2/13/2017.
 */
(function () {
    angular
        .module("WebAppMaker")
        .factory('UserService', userService);

    function userService() {
        var users = [
            {
                _id: "123",
                username: "alice",
                password: "alice",
                firstName: "Alice",
                lastName: "Wonder",
                email: "alice@wonder.com"
            },
            {
                _id: "234",
                username: "bob",
                password: "bob",
                firstName: "Bob",
                lastName: "Marley",
                email: "bob@marley.com"
            },
            {
                _id: "345",
                username: "charly",
                password: "charly",
                firstName: "Charly",
                lastName: "Garcia",
                email: "charly@garcia.com"
            },
            {
                _id: "456",
                username: "jannunzi",
                password: "jannunzi",
                firstName: "Jose",
                lastName: "Annunzi",
                email: "jose@annunzi.com"
            }
        ];

        var api = {
            "users": users,
            "updateUser": updateUser,
            "findUserByCredentials": findUserByCredentials,
            "findUserById": findUserById,
            "findUserByUsername": findUserByUsername,
            "createUser": createUser,
            "deleteUser": deleteUser,
        };
        return api;

        function createUser(user) {
            user._id = new Date().getTime().toString();
            users.push(user);
            return user._id;
        }

        function findUserById(userID) {
            for (var u in users) {
                var user = users[u];
                if (user._id === userID) {
                    return angular.copy(user);
                }
            }
            return null;
        }

        function findUserByUsername(username) {
            for (var u in users) {
                var user = users[u];
                if (user.username === username) {
                    return angular.copy(user);
                }
            }
            return null;
        }

        function findUserByCredentials(username, password) {
            for (var u in users) {
                var user = users[u];
                if (user.username === username &&
                    user.password === password) {
                    return angular.copy(user);
                }
            }
            return null;
        }

        function updateUser(userID, updatedUser) {
            for (var u in users) {
                var user = users[u];
                if (user._id === userID) {
                    user.firstName = updatedUser.firstName;
                    user.lastName = updatedUser.lastName;
                    user.email = updatedUser.email;
                    return user;
                }
            }
            return null;
        }

        function deleteUser(userID) {
            for (var u in users) {
                var user = users[u];
                if (user._id === userID) {
                    users.splice(u, 1);
                }
            }
        }

    }
})();
