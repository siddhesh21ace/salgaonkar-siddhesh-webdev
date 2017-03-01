/**
 * Created by Siddhesh on 2/25/2017.
 */

module.exports = function (app) {
    app.get("/api/user/:userID/website", findWebsitesByUser);
    app.get("/api/website/:websiteID", findWebsiteById);
    app.post("/api/user/:userID/website", createWebsite);
    app.put("/api/website/:websiteID", updateWebsite);
    app.delete("/api/website/:websiteID", deleteWebsite);

    var websites = [
        {"_id": "123", "name": "Facebook", "developerId": "456", "description": "Lorem", created: new Date()},
        {"_id": "234", "name": "Twitter", "developerId": "456", "description": "Lorem", created: new Date()},
        {"_id": "456", "name": "Gizmodo", "developerId": "456", "description": "Lorem", created: new Date()},
        {"_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem", created: new Date()},
        {"_id": "678", "name": "Checkers", "developerId": "123", "description": "Lorem", created: new Date()},
        {"_id": "789", "name": "Chess", "developerId": "234", "description": "Lorem", created: new Date()}
    ];

    function createWebsite(req, res) {
        var userID = req.params['userID'];
        var newWebsite = req.body;

        newWebsite.developerId = userID;
        newWebsite._id = new Date().getTime().toString();
        websites.push(newWebsite);
        res.json(newWebsite);
    }

    function findWebsitesByUser(req, res) {
        var userID = req.params['userID'];
        var sites = [];
        for (var w in websites) {
            if (websites[w].developerId === userID) {
                sites.push(websites[w]);
            }
        }
        res.send(sites);
    }

    function findWebsiteById(req, res) {
        var websiteID = req.params['websiteID'];
        for (var w in websites) {
            var website = websites[w];
            if (website._id === websiteID) {
                res.send(website);
                return;
            }
        }
        res.sendStatus(404);
    }

    function updateWebsite(req, res) {
        var websiteID = req.params['websiteID'];
        for (var w in websites) {
            var website = websites[w];
            if (website._id === websiteID) {
                var updatedWebsite = req.body;
                website.name = updatedWebsite.name;
                website.description = updatedWebsite.description;
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(404);
    }

    function deleteWebsite(req, res) {
        var websiteID = req.params['websiteID'];
        for (var w in websites) {
            if (websites[w]._id === websiteID) {
                websites.splice(w, 1);
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(404);
    }
};