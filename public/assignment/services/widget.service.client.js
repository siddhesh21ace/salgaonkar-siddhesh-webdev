/**
 * Created by Siddhesh on 2/13/2017.
 */
(function () {
    angular
        .module("WebAppMaker")
        .service("WidgetService", WidgetService);

    function WidgetService() {
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
                "url": "https://i.kinja-img.com/gawker-media/image/upload/s--UE7cu6DV--/c_scale,fl_progressive,q_80,w_800/xoo0evqxzxrrmrn4ayoq.jpg"
            },
            {
                "_id": "456", "name": "Paragraph Text",
                "widgetType": "HTML",
                "pageId": "321",
                "text": '<p>Anker’s kevlar-reinforced PowerLine cables are <a href="http://gear.lifehacker.com/your-favorite-lightning-cables-anker-powerline-and-pow-1782036601" target="_blank" rel="noopener">far and away our readers’ top choice for charging their gadgets</a>, and you can save on several models today, including some from the nylon-wrapped PowerLine+ collection. I use these cables every single day, and I’ve never had one fray or stop working. Just be sure to note the promo codes below.<br></p>'
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

        var api = {
            "createWidget": createWidget,
            "findWidgetsByPageId": findWidgetsByPageId,
            "findWidgetById": findWidgetById,
            "updateWidget": updateWidget,
            "deleteWidget": deleteWidget,
            "createWidgetFromType": createWidgetFromType
        };
        return api;

        function createWidget(pageID, widget) {
            widget.pageId = pageID;
            widget._id = new Date().getTime().toString();
            widgets.push(widget);
            return widget._id;
        }

        function findWidgetsByPageId(pageID) {
            var pageWidgets = [];
            for (var wg in widgets) {
                if (widgets[wg].pageId === pageID) {
                    pageWidgets.push(widgets[wg]);
                }
            }
            return pageWidgets;
        }

        function findWidgetById(widgetID) {
            for (var wg in widgets) {
                if (widgets[wg]._id === widgetID) {
                    return angular.copy(widgets[wg]);
                }
            }
            return null;
        }

        function updateWidget(widgetID, updatedWidget) {
            for (var wg in widgets) {
                var widget = widgets[wg];
                if (widget._id === widgetID) {
                    widget.size = updatedWidget.size;
                    widget.text = updatedWidget.text;
                    widget.width = updatedWidget.width;
                    widget.url = updatedWidget.url;
                    return widget;
                }
            }
            return null;
        }

        function deleteWidget(widgetID) {
            for (var wg in widgets) {
                if (widgets[wg]._id === widgetID) {
                    widgets.splice(wg, 1);
                }
            }
        }

        function createWidgetFromType(pageID, widgetType) {
            var widget = {
                "name": "Sample Widget",
                "size": "1",
                "text": "Sample Text",
                "url": "Sample URL",
                "width": "100%",
                "widgetType": widgetType.toUpperCase()
            };
            return createWidget(pageID, widget);
        }
    }
})();