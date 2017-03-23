/**
 * Created by Siddhesh on 2/25/2017.
 */
module.exports = function (app, models) {
    app.get("/api/user", findUser);
    app.get("/api/user/:userID", findUserById);
    app.post("/api/user", createUser);
    app.put("/api/user/:userID", updateUser);
    app.delete("/api/user/:userID", deleteUser);


    function createUser(req, res) {
        var user = req.body;
        var newUser = {
            "username": user.username,
            "password": user.password,
            "email": user.email,
            "firstName": user.firstName,
            "lastName": user.lastName
        };
        models.userModel
            .createUser(newUser)
            .then(function (user) {
                res.json(user);
            }, function (error) {
                res.status(404).send("Error occured while creating user: " + error);
            });
    }

    function findUserById(req, res) {
        var userId = req.params['userID'];

        models.userModel
            .findUserById(userId)
            .then(function (user) {
                res.json(user);
            }, function (error) {
                res.status(404).send("User not found for the user ID : " + userId + " with error " + error);
            });
    }

    function findUserByUsername(req, res) {
        var username = req.query['username'];
        models.userModel
            .findUserbyUsername(username)
            .then(function (users) {
                if (users.length !== 0) {
                    res.json(users[0]);
                }
                else {
                    res.status(404).send("User not found for username: " + username);
                }
            }, function (error) {
                res.status(404).send("User not found for username: " + username + " with error: " + error);
            });
    }

    function findUserByCredentials(req, res) {
        var username = req.query['username'];
        var password = req.query['password'];

        models.userModel
            .findUserByCredentials(username, password)
            .then(function (users) {
                if (users.length !== 0) {
                    res.json(users[0]);
                }
                else {
                    res.status(404).send('User not found for username: ' + username + ' and password: ' + password);
                }
            }, function (error) {
                res.status(404).send('User not found for username: ' + username + ' and password: ' + password +
                    " with error: " + error);
            });
    }

    function updateUser(req, res) {
        var userID = req.params['userID'];
        var updatedUser = req.body;

        models.userModel
            .updateUser(userID, updatedUser)
            .then(function (response) {
                if (response.nModified === 1) {
                    models.userModel
                        .findUserById(userID)
                        .then(function (user) {
                            res.json(user);
                        }, function () {
                            res.sendStatus(404);
                        })
                }
                else {
                    res.status(404).send("User update failed.");
                }
            }, function (error) {
                res.sendStatus(404).send("User update failed with error: " + error);
            });
    }

    function deleteUser(req, res) {
        var userID = req.params['userID'];

        models.userModel
            .deleteUser(userID)
            .then(function (response) {
                res.status(200).send(response);
            }, function (error) {
                res.status(404).send(error);
            });
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