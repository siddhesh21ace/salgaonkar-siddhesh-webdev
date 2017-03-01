/**
 * Created by Siddhesh on 2/13/2017.
 */
(function () {
    angular
        .module("WebAppMaker")
        .factory("WebsiteService", websiteService);

    function websiteService($http) {
        var api = {
            "createWebsite": createWebsite,
            "findWebsiteById": findWebsiteById,
            "deleteWebsite": deleteWebsite,
            "findWebsitesByUser": findWebsitesByUser,
            "updateWebsite": updateWebsite
        };
        return api;

        function createWebsite(userID, website) {
            return $http.post("/api/user/" + userID + "/website", website);
        }

        function findWebsitesByUser(userID) {
            return $http.get("/api/user/" + userID + "/website");
        }

        function findWebsiteById(websiteID) {
            return $http.get("/api/website/" + websiteID);
        }

        function updateWebsite(websiteID, updatedWebsite) {
            return $http.put("/api/website/" + websiteID, updatedWebsite);
        }

        function deleteWebsite(websiteID) {
            return $http.delete('/api/website/' + websiteID);
        }
    }
})();