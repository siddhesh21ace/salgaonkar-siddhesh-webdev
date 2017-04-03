/**
 * Created by Siddhesh on 2/25/2017.
 */
module.exports = function (app, models) {
    var bcrypt = require("bcrypt-nodejs");
    var passport = require('passport');
    var LocalStrategy = require('passport-local').Strategy;
    var FacebookStrategy = require('passport-facebook').Strategy;

    passport.use(new LocalStrategy({}, localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    app.get("/api/user", findUser);
    app.get("/api/user/:userID", findUserById);
    app.put("/api/user/:userID", selfLoggedIn, updateUser);
    app.delete("/api/user/:userID", selfLoggedIn, deleteUser);

    app.post("/api/isLoggedIn", isLoggedIn);
    app.post("/api/logout", logout);
    app.post("/api/register", register);

    app.post('/api/login', function (req, res, next) {
        passport.authenticate('local', function (err, user, info) {
            if (err) {
                return res.send(err);
            }
            if (!user) {
                return res.status(404).send(info);
            }
            req.logIn(user, function (err) {
                if (err) {
                    return res.send(err);
                }
                return res.json(user);
            });
        })(req, res, next);
    });

    app.get('/auth/facebook', passport.authenticate('facebook', {scope: 'email'}));
    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect: '/assignment/index.html#/user',
            failureRedirect: '/assignment/index.html#/login'
        }));

    var facebookConfig = {
        clientID: process.env.FACEBOOK_CLIENT_ID,
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL: process.env.FACEBOOK_CALLBACK_URL,
        profileFields: ['id', 'displayName', 'photos', 'email']
    };
    passport.use(new FacebookStrategy(facebookConfig, facebookStrategy));

    function facebookStrategy(token, refreshToken, profile, done) {
        models.userModel
            .findUserByFacebookId(profile.id)
            .then(
                function (user) {
                    if (user) {
                        return done(null, user);
                    } else {
                        var names = profile.displayName.split(" ");
                        var newFacebookUser = {
                            lastName: names[1],
                            firstName: names[0],
                            email: profile.emails ? profile.emails[0].value : "",
                            facebook: {
                                id: profile.id,
                                token: token
                            }
                        };
                        return models.userModel.createUser(newFacebookUser);
                    }
                },
                function (err) {
                    if (err) {
                        return done(err);
                    }
                }
            )
            .then(
                function (user) {
                    return done(null, user);
                },
                function (err) {
                    if (err) {
                        return done(err);
                    }
                }
            );
    }

    function selfLoggedIn(req, res, next) {
        var loggedIn = req.isAuthenticated();
        var userId = req.params.userID;
        var self = (userId == req.user._id);
        if (self && loggedIn) {
            next();
        } else {
            res.status(400).send("Invalid modification attempt!");
        }
    }

    function logout(req, res) {
        req.logout();
        res.status(200).send({});
    }

    function localStrategy(username, password, done) {
        models
            .userModel
            .findUserbyUsername(username)
            .then(
                function (user) {
                    if (!user) {
                        return done(null, false, 'Incorrect username!');
                    }
                    if (!bcrypt.compareSync(password, user.password)) {
                        return done(null, false, 'Incorrect password!');
                    }
                    return done(null, user);
                },
                function (error) {
                    return done(error);
                }
            );
    }

    function login(req, res) {
        res.json(req.user);
    }

    function serializeUser(user, done) {
        done(null, user._id);
    }

    function deserializeUser(id, done) {
        models.userModel
            .findUserById(id)
            .then(
                function (user) {
                    done(null, user);
                },
                function (err) {
                    done(err, null);
                }
            );
    }

    function isLoggedIn(req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    }

    function register(req, res) {
        var newUser = req.body;
        newUser.password = bcrypt.hashSync(newUser.password);

        models.userModel
            .findUserbyUsername(newUser.username)
            .then(function (user) {
                    if (user === null) {
                        models.userModel.createUser(newUser)
                            .then(function (user) {
                                if (user) {
                                    req.login(user, function (error) {
                                        if (error) {
                                            res.status(400).send("Error occured. Please try again!");
                                            console.log(error);
                                        } else {
                                            res.json(user);
                                        }
                                    });
                                }
                            }, function (error) {
                                res.status(400).send("Error occured. Please try again!");
                                console.log(error);
                            });
                    } else {
                        res.status(401).send("User already exists!");
                    }
                },
                function (err) {
                    res.status(400).send("Error occured. Please try again!");
                    console.log(err);
                }
            )
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

        req.logout();
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
        } else {
            res.json(req.user);
        }
    }

};