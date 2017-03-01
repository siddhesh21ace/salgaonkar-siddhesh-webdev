/**
 * Created by Siddhesh on 2/25/2017.
 */

module.exports = function (app) {
    var multer = require('multer'); // npm install multer --save
    var upload = multer({dest: __dirname + '/../../public/uploads'});

    app.get("/api/page/:pageID/widget", findWidgetsByPageId);
    app.get("/api/widget/:widgetID", findWidgetById);
    app.post("/api/page/:pageID/widget", createWidget);
    app.put("/api/widget/:widgetID", updateWidget);
    app.delete("/api/widget/:widgetID", deleteWidget);
    app.post("/api/upload", upload.single('widget-file'), uploadImage);
    app.put("/api/page/:pageID/widget", sortWidgets);

    var widgets = [
        {
            "_id": "123",
            "name": "Main Header",
            "widgetType": "HEADER",
            "pageId": "321",
            "size": "2",
            "text": "GIZMODO"
        },
        {
            "_id": "234",
            "name": "Paragraph Header",
            "widgetType": "HEADER",
            "pageId": "321",
            "size": "4",
            "text": "Lorem ipsum"
        },
        {
            "_id": "345", "name": "Illus. Image", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
            "url": "https://i.kinja-img.com/gawker-media/image/upload/s--UE7cu6DV--/" +
            "c_scale,fl_progressive,q_80,w_800/xoo0evqxzxrrmrn4ayoq.jpg"
        },
        {
            "_id": "456", "name": "Paragraph Text",
            "widgetType": "HTML",
            "pageId": "321",
            "text": '<p>Anker’s kevlar-reinforced PowerLine cables are <a href="http://gear.lifehacker    .com/your-favorite-lightning-cables-anker-powerline-and-pow-1782036601" target="_blank" rel="noopener">' +
            'far and away our readers’ top choice for charging their gadgets</a>, and you can save on several ' +
            'models today, including some from the nylon-wrapped PowerLine+ collection. I use these cables every' +
            ' single day, and I’ve never had one fray or stop working. Just be sure to note the promo codes' +
            ' below.<br></p>'
        },
        {
            "_id": "567",
            "name": "Image Caption",
            "widgetType": "HEADER",
            "pageId": "321",
            "size": "4",
            "text": "Lorem ipsum"
        },
        {
            "_id": "678", "name": "Content Video", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
            "url": "https://youtu.be/AM2Ivdi9c4E"
        },
        {
            "_id": "789",
            "name": "Video Description",
            "widgetType": "HTML",
            "pageId": "321",
            "text": "<p>Lorem ipsum</p>"
        }
    ];

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

        var widget = getWidget(widgetID);
        var updatedWidget = {
            "name": originalname,
            "url": url,
            "width": width
        };
        handleUpdate(widget, updatedWidget);
        res.redirect("/assignment/index.html#/user/" + userID + "/website/" +
            websiteID + "/page/" + pageID + "/widget");
    }

    function createWidget(req, res) {
        var pageID = req.params['pageID'];
        var newWidget = req.body;

        newWidget.pageId = pageID;
        newWidget._id = new Date().getTime().toString();
        widgets.push(newWidget);
        res.json(newWidget);
    }

    function findWidgetsByPageId(req, res) {
        var pageID = req.params['pageID'];
        var pageWidgets = [];

        for (var wg in widgets) {
            if (widgets[wg].pageId === pageID) {
                pageWidgets.push(widgets[wg]);
            }
        }

        res.send(pageWidgets);
    }

    function findWidgetById(req, res) {
        var widgetID = req.params['widgetID'];
        var widget = getWidget(widgetID);
        if (widget != null && widget != undefined) {
            res.send(widget);
            return;
        }
        res.sendStatus(404);
    }

    function updateWidget(req, res) {
        var widgetID = req.params['widgetID'];
        var updatedWidget = req.body;
        var widget = getWidget(widgetID);
        if (widget != null && widget != undefined) {
            handleUpdate(widget, updatedWidget);
            res.sendStatus(200);
            return;
        }
        res.sendStatus(404);
    }

    function getWidget(widgetID) {
        return widgets.find(function (w) {
            return w._id == widgetID;
        })

    }

    function handleUpdate(widget, updatedWidget) {
        widget.name = updatedWidget.name;
        widget.size = updatedWidget.size;
        widget.text = updatedWidget.text;
        widget.width = updatedWidget.width;
        widget.url = updatedWidget.url;
    }

    function deleteWidget(req, res) {
        var widgetID = req.params['widgetID'];

        for (var wg in widgets) {
            if (widgets[wg]._id === widgetID) {
                widgets.splice(wg, 1);
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(404);
    }

    function sortWidgets(req, res) {
        var initial = req.query['initial'];
        var final = req.query['final'];

        widgets.splice(final, 0, widgets.splice(initial, 1)[0]);
        res.json(widgets);
    }
};