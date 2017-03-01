/**
 * Created by Siddhesh on 2/25/2017.
 */

module.exports = function (app) {
    app.get("/api/website/:websiteID/page", findPageByWebsiteId);
    app.get("/api/page/:pageID", findPageById);
    app.post("/api/website/:websiteID/page", createPage);
    app.put("/api/page/:pageID", updatePage);
    app.delete("/api/page/:pageID", deletePage);

    var pages = [
        {"_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem"},
        {"_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem"},
        {"_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem"}
    ];

    function createPage(req, res) {
        var websiteID = req.params['websiteID'];
        var newPage = req.body;

        newPage.websiteId = websiteID;
        newPage._id = new Date().getTime().toString();
        pages.push(newPage);
        res.json(newPage);
    }

    function findPageByWebsiteId(req, res) {
        var websiteID = req.params['websiteID'];
        var webPages = [];

        for (var p in pages) {
            if (pages[p].websiteId === websiteID) {
                webPages.push(pages[p]);
            }
        }
        res.send(webPages);
    }

    function findPageById(req, res) {
        var pageID = req.params['pageID'];

        for (var p in pages) {
            var page = pages[p];
            if (page._id === pageID) {
                res.send(page);
                return;
            }
        }
        res.sendStatus(404);
    }

    function updatePage(req, res) {
        var pageID = req.params['pageID'];

        for (var p in pages) {
            var page = pages[p];
            if (page._id === pageID) {
                var updatedPage = req.body;
                page.name = updatedPage.name;
                page.description = updatedPage.description;
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(404);
    }

    function deletePage(req, res) {
        var pageID = req.params['pageID'];
        for (var p in pages) {
            if (pages[p]._id === pageID) {
                pages.splice(p, 1);
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(404);
    }
};