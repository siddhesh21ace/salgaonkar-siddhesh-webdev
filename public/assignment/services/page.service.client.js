/**
 * Created by Siddhesh on 2/13/2017.
 */
(function () {
    angular
        .module("WebAppMaker")
        .factory("PageService", pageService);

    function pageService() {
        var pages = [
            { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
            { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
            { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
        ];
        var api = {
            "createPage": createPage,
            "findPageByWebsiteId": findPageByWebsiteId,
            "findPageById": findPageById,
            "updatePage": updatePage,
            "deletePage": deletePage
        };
        return api;

        function createPage(websiteID, page) {
            page.websiteId = websiteID;
            page._id = new Date().getTime().toString();
            pages.push(page);
        }

        function findPageByWebsiteId(websiteID) {
            var webPages = [];
            for (var p in pages) {
                if (pages[p].websiteId === websiteID) {
                    webPages.push(pages[p]);
                }
            }
            return webPages;
        }

        function findPageById(pageID) {
            for (var p in pages) {
                if (pages[p]._id === pageID) {
                    return angular.copy(pages[p]);
                }
            }
            return null;
        }

        function updatePage(pageID, updatedPage) {
            for (var p in pages) {
                var page = pages[p];
                if (page._id === pageID) {
                    page.name = updatedPage.name;
                    page.description = updatedPage.description;
                    return page;
                }
            }
            return null;
        }

        function deletePage(pageID) {
            for (var p in pages) {
                if (pages[p]._id === pageID) {
                    pages.splice(p, 1);
                }
            }
        }
    }
})();