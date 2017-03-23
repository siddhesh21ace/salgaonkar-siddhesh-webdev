/**
 * Created by Siddhesh on 2/25/2017.
 */

module.exports = function (app, models) {
    app.get("/api/website/:websiteID/page", findPageByWebsiteId);
    app.get("/api/page/:pageID", findPageById);
    app.post("/api/website/:websiteID/page", createPage);
    app.put("/api/page/:pageID", updatePage);
    app.delete("/api/page/:pageID", deletePage);

    function createPage(req, res) {
        var websiteID = req.params['websiteID'];
        var newPage = req.body;

        models.pageModel
            .createPage(websiteID, newPage)
            .then(function (page) {
                models.websiteModel
                    .findWebsiteById(websiteID)
                    .then(function (website) {
                        website.pages.push(page._id);
                        website.save();
                        res.json(page);
                    }, function (error) {
                        res.status(404).send(error);
                    })
            }, function (error) {
                res.status(404).send(error);
            });
    }

    function findPageByWebsiteId(req, res) {
        var websiteID = req.params['websiteID'];

        models.pageModel
            .findAllPagesForWebsite(websiteID)
            .then(function (pages) {
                res.json(pages);
            }, function (error) {
                res.status(404).send(error);
            });
    }

    function findPageById(req, res) {
        var pageID = req.params['pageID'];

        models.pageModel
            .findPageById(pageID)
            .then(function (page) {
                res.json(page);
            }, function (error) {
                res.status(404).send(error);
            });
    }

    function updatePage(req, res) {
        var pageID = req.params['pageID'];
        var updatedPage = req.body;

        models.pageModel
            .updatePage(pageID, updatedPage)
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

    function deletePage(req, res) {
        var pageID = req.params['pageID'];

        models.pageModel.findPageById(pageID)
            .then(function (page) {
                models.websiteModel.findWebsiteById(page._website)
                    .then(function (website) {
                        website.pages.pull(pageID);
                        website.save();

                        models.pageModel.deletePage(pageID)
                            .then(function (response) {
                                if (response.result.n === 1 && response.result.ok === 1) {
                                    res.sendStatus(200);
                                }
                                else {
                                    res.sendStatus(404);
                                }
                            }, function (error) {
                                res.status(404).send('Page not found to delete' + error);
                            });
                    }, function (error) {
                        res.status(404).send(error);
                    });
            }, function (error) {
                res.status(404).send(error);
            });
    }
};