/**
 * Created by Siddhesh on 2/25/2017.
 */

module.exports = function (app, models) {
    var multer = require('multer'); // npm install multer --save
    var upload = multer({dest: __dirname + '/../../public/uploads'});

    app.get("/api/page/:pageID/widget", findWidgetsByPageId);
    app.get("/api/widget/:widgetID", findWidgetById);
    app.post("/api/page/:pageID/widget", createWidget);
    app.put("/api/widget/:widgetID", updateWidget);
    app.delete("/api/widget/:widgetID", deleteWidget);
    app.post("/api/upload", upload.single('widget-file'), uploadImage);
    app.put("/api/page/:pageID/widget", sortWidgets);

    function uploadImage(req, res) {
        var widgetID = req.body['widget-id'];
        var width = req.body['widget-width'];
        var name = req.body['widget-name'];

        var userID = req.query['uid'];
        var websiteID = req.query['wid'];
        var pageID = req.query['pid'];

        var uploadedFile = req.file;

        var originalname = uploadedFile.originalname; // file name on user's computer
        var filename = uploadedFile.filename;     // new file name in upload folder

        var url = "/uploads/" + filename;

        var imageWidget = {
            "_id": widgetID,
            "type": "IMAGE",
            "name": originalname,
            "url": url,
            "width": width
        };

        models.widgetModel
            .updateWidget(widgetID, imageWidget)
            .then(function (response) {
                if (response.ok === 1 && response.n === 1) {
                    res.redirect("/assignment/index.html#/user/" + userID + "/website/" +
                        websiteID + "/page/" + pageID + "/widget");
                }
                else {
                    res.sendStatus(404);
                }
            }, function (error) {
                res.status(404).send(error);
            });
    }

    function createWidget(req, res) {
        var pageID = req.params['pageID'];
        var newWidget = req.body;

        models.widgetModel
            .createWidget(pageID, newWidget)
            .then(function (widget) {
                models.pageModel
                    .findPageById(pageID)
                    .then(function (page) {
                        page.widgets.push(widget._id);
                        page.save();
                        res.json(widget);
                    }, function (error) {
                        res.status(404).send(error);
                    })
            }, function (error) {
                res.status(404).send(error);
            });
    }

    function findWidgetsByPageId(req, res) {
        var pageID = req.params['pageID'];

        models.pageModel.findAllWidgetsForPage(pageID)
            .then(function (page) {
                res.send(page.widgets);
            }, function (error) {
                res.status(404).send(error);
            });
    }

    function findWidgetById(req, res) {
        var widgetID = req.params['widgetID'];

        models.widgetModel.findWidgetById(widgetID)
            .then(function (widget) {
                res.send(widget);
            }, function (error) {
                res.status(404).send(error);
            });
    }

    function updateWidget(req, res) {
        var widgetID = req.params['widgetID'];
        var updatedWidget = req.body;

        models.widgetModel.updateWidget(widgetID, updatedWidget)
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

    function deleteWidget(req, res) {
        var widgetID = req.params['widgetID'];

        models.widgetModel.findWidgetById(widgetID)
            .then(function (widget) {
                models.pageModel.findPageById(widget._page)
                    .then(function (page) {
                        page.widgets.pull(widgetID);
                        page.save();

                        models.widgetModel.deleteWidget(widgetID)
                            .then(function (response) {
                                if (response.result.n === 1 && response.result.ok === 1) {
                                    res.sendStatus(200);
                                }
                                else {
                                    res.sendStatus(404);
                                }
                            }, function (error) {
                                res.status(404).send('Widget not found to delete' + error);
                            });
                    }, function (error) {
                        res.status(404).send(error);
                    });
            }, function (error) {
                res.status(404).send(error);
            });
    }

    function sortWidgets(req, res) {
        var initial = req.query['initial'];
        var final = req.query['final'];
        var pageID = req.params['pageID'];

        models.pageModel.findPageById(pageID)
            .then(function (page) {
                page.widgets.splice(final, 0, page.widgets.splice(initial, 1)[0]);
                page.save();
                res.sendStatus(200);
            }, function (error) {
                res.status(404).send(error);
            });
    }

};