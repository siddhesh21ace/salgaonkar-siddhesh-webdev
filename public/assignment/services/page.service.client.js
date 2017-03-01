/**
 * Created by Siddhesh on 2/13/2017.
 */
(function () {
    angular
        .module("WebAppMaker")
        .factory("PageService", pageService);

    function pageService($http) {
        var api = {
            "createPage": createPage,
            "findPageByWebsiteId": findPageByWebsiteId,
            "findPageById": findPageById,
            "updatePage": updatePage,
            "deletePage": deletePage
        };
        return api;

        function createPage(websiteID, page) {
            return $http.post("/api/website/" + websiteID + "/page", page);
        }

        function findPageByWebsiteId(websiteID) {
            return $http.get("/api/website/" + websiteID + "/page");
        }

        function findPageById(pageID) {
            return $http.get("/api/page/" + pageID);
        }

        function updatePage(pageID, updatedPage) {
            return $http.put("/api/page/" + pageID, updatedPage);
        }

        function deletePage(pageID) {
            return $http.delete('/api/page/' + pageID);
        }
    }
})();