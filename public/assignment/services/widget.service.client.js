/**
 * Created by Siddhesh on 2/13/2017.
 */
(function () {
    angular
        .module("WebAppMaker")
        .service("WidgetService", WidgetService);

    function WidgetService($http) {
        var api = {
            "createWidget": createWidget,
            "findWidgetsByPageId": findWidgetsByPageId,
            "findWidgetById": findWidgetById,
            "updateWidget": updateWidget,
            "deleteWidget": deleteWidget,
            "sortWidgets": sortWidgets,
        };
        return api;

        function createWidget(pageID, widget) {
            return $http.post("/api/page/" + pageID + "/widget", widget);
        }

        function findWidgetsByPageId(pageID) {
            return $http.get("/api/page/" + pageID + "/widget");
        }

        function findWidgetById(widgetID) {
            return $http.get("/api/widget/" + widgetID);
        }

        function updateWidget(widgetID, updatedWidget) {
            return $http.put("/api/widget/" + widgetID, updatedWidget);
        }

        function deleteWidget(widgetID) {
            return $http.delete('/api/widget/' + widgetID);
        }

        function sortWidgets(initial, final, pageID) {
            var url = "/api/page/" + pageID + "/widget?initial=" + initial + "&final=" + final;
            $http.put(url);
        }

    }
})();