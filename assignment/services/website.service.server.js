/**
 * Created by Siddhesh on 2/25/2017.
 */

module.exports = function (app, models) {
    app.get("/api/user/:userID/website", findWebsitesByUser);
    app.get("/api/website/:websiteID", findWebsiteById);
    app.post("/api/user/:userID/website", createWebsite);
    app.put("/api/website/:websiteID", updateWebsite);
    app.delete("/api/website/:websiteID", deleteWebsite);

    function createWebsite(req, res) {
        var userID = req.params['userID'];
        var newWebsite = req.body;

        models.websiteModel
            .createWebsiteForUser(userID, newWebsite)
            .then(function (website) {
                models.userModel
                    .findUserById(userID)
                    .then(function (user) {
                        user.websites.push(website._id);
                        user.save();
                        res.json(website);
                    }, function (error) {
                        res.status(404).send(error);
                    })
            }, function (error) {
                res.status(404).send(error);
            });
    }

    function findWebsitesByUser(req, res) {
        var userID = req.params['userID'];

        models.websiteModel
            .findAllWebsitesForUser(userID)
            .then(function (websites) {
                res.json(websites);
            }, function (error) {
                res.status(404).send(error);
            });
    }

    function findWebsiteById(req, res) {
        var websiteID = req.params['websiteID'];

        models.websiteModel
            .findWebsiteById(websiteID)
            .then(function (website) {
                res.json(website);
            }, function (error) {
                res.status(404).send(error);
            });
    }

    function updateWebsite(req, res) {
        var websiteID = req.params['websiteID'];
        var updatedWebsite = req.body;

        models.websiteModel
            .updateWebsite(websiteID, updatedWebsite)
            .then(function (response) {
                if (response.ok === 1 && response.n === 1) {
                    res.sendStatus(200);
                }
                else {
                    res.sendStatus(404);
                }
            }, function (error) {
                res.status(404).send(error);
            });
    }

    function deleteWebsite(req, res) {
        var websiteID = req.params['websiteID'];

        models.websiteModel.findWebsiteById(websiteID)
            .then(function (website) {
                models.userModel.findUserById(website._user)
                    .then(function (user) {
                        user.websites.pull(websiteID);
                        user.save();

                        models.websiteModel.deleteWebsite(websiteID)
                            .then(function (response) {
                                if (response.result.n === 1 && response.result.ok === 1) {
                                    res.sendStatus(200);
                                }
                                else {
                                    res.sendStatus(404);
                                }
                            }, function (error) {
                                res.status(404).send('Website not found to delete' + error);
                            });
                    }, function (error) {
                        res.status(404).send(error);
                    });
            }, function (error) {
                res.status(404).send(error);
            });
    }
};