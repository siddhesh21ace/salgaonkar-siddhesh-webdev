/**
 * Created by Siddhesh on 2/25/2017.
 */
module.exports = function (app) {
    app.get("/api/user", findUser);
    app.get("/api/user/:userID", findUserById);
    app.post("/api/user", createUser);
    app.put("/api/user/:userID", updateUser);
    app.delete("/api/user/:userID", deleteUser);

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

    function createUser(req, res) {
        var newUser = req.body;
        newUser._id = new Date().getTime().toString();
        users.push(newUser);
        res.json(newUser);
    }

    function findUserById(req, res) {
        var userId = req.params['userID'];
        for (var u in users) {
            var user = users[u];
            if (user._id === userId) {
                res.send(user);
                return;
            }
        }
        res.status(404).send({});
    }

    function findUserByUsername(req, res) {
        var username = req.query['username'];
        var user = users.find(function (u) {
            return u.username == username;
        });
        if (user) {
            res.send(user);
        } else {
            res.status(404).send('User not found for username: ' + username);
        }
    }

    function findUserByCredentials(req, res) {
        var username = req.query['username'];
        var password = req.query['password'];
        var user = users.find(function (u) {
            return u.username == username && u.password == password;
        });
        if (user) {
            res.send(user);
        } else {
            res.status(404).send('User not found for username: ' + username + ' and password: ' + password);
        }
    }

    function updateUser(req, res) {
        var userID = req.params['userID'];
        for (var u in users) {
            var user = users[u];
            if (user._id === userID) {
                var updatedUser = req.body;
                user.firstName = updatedUser.firstName;
                user.lastName = updatedUser.lastName;
                user.email = updatedUser.email;
                res.status(200).send({});
                return;
            }
        }
        res.status(404).send({});
    }

    function deleteUser(req, res) {
        var userID = req.params['userID'];
        for (var u in users) {
            var user = users[u];
            if (user._id === userID) {
                users.splice(u, 1);
                res.status(200).send({});
                return;
            }
        }
        res.status(404).send({});
    }

    function findUser(req, res) {
        var username = req.query['username'];
        var password = req.query['password'];
        if (username && password) {
            findUserByCredentials(req, res);
        } else if (username) {
            findUserByUsername(req, res);
        }
    }

};