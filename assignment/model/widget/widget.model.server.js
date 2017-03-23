/**
 * Created by Siddhesh on 3/21/2017.
 */
module.exports = function () {
    var mongoose = require("mongoose");
    var widgetSchema = require('./widget.schema.server');
    var WidgetModel = mongoose.model('WidgetModel', widgetSchema);

    var api = {
        "createWidget": createWidget,
        "findAllWidgetsForPage": findAllWidgetsForPage,
        "findWidgetById": findWidgetById,
        "updateWidget": updateWidget,
        "deleteWidget": deleteWidget,
        "reorderWidget": reorderWidget,
    };

    return api;

    function createWidget(pageId, widget) {
        widget._page = pageId;
        return WidgetModel.create(widget);
    }

    function findAllWidgetsForPage(pageId) {
        /*
         This method is not used.
         Refer page.moder.server.findAllWidgetsForPage() for implementation
         * */
        return null;
    }

    function findWidgetById(widgetId) {
        return WidgetModel.findById(widgetId);
    }

    function updateWidget(widgetId, updatedWidget) {
        return WidgetModel.update({"_id": widgetId}, {$set: updatedWidget});
    }

    function deleteWidget(widgetId) {
        return WidgetModel.remove({"_id": widgetId});
    }

    function reorderWidget(pageId, start, end) {
        /*
         This method is not used.
         Refer widget.service.server.sortWidgets() for implementation
         * */
        return null;
    }
};