/**
 * Created by Siddhesh on 2/13/2017.
 */
(function () {
    angular
        .module("WebAppMaker")
        .factory("WebsiteService", websiteService);

    function websiteService() {
        var websites = [
            {"_id": "123", "name": "Facebook", "developerId": "456", "description": "Lorem", created: new Date()},
            {"_id": "234", "name": "Twitter", "developerId": "456", "description": "Lorem", created: new Date()},
            {"_id": "456", "name": "Gizmodo", "developerId": "456", "description": "Lorem", created: new Date()},
            {"_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem", created: new Date()},
            {"_id": "678", "name": "Checkers", "developerId": "123", "description": "Lorem", created: new Date()},
            {"_id": "789", "name": "Chess", "developerId": "234", "description": "Lorem", created: new Date()}
        ];
        var api = {
            "createWebsite": createWebsite,
            "findWebsiteById": findWebsiteById,
            "deleteWebsite": deleteWebsite,
            "findWebsitesByUser": findWebsitesByUser,
            "updateWebsite": updateWebsite
        };
        return api;

        function createWebsite(userID, website) {
            website.developerId = userID;
            website._id = new Date().getTime().toString();
            websites.push(website);
        }

        function findWebsitesByUser(userID) {
            var sites = [];
            for (var w in websites) {
                if (websites[w].developerId === userID) {
                    sites.push(websites[w]);
                }
            }
            return sites;
        }

        function findWebsiteById(websiteID) {
            for (var w in websites) {
                if (websites[w]._id === websiteID) {
                    return angular.copy(websites[w]);
                }
            }
            return null;
        }

        function updateWebsite(websiteID, updatedWebsite) {
            for (var w in websites) {
                var website = websites[w];
                if (website._id === websiteID) {
                    website.name = updatedWebsite.name;
                    website.description = updatedWebsite.description;
                    return website;
                }
            }
            return null;
        }

        function deleteWebsite(websiteID) {
            for (var w in websites) {
                if (websites[w]._id === websiteID) {
                    websites.splice(w, 1);
                }
            }
        }
    }
})();