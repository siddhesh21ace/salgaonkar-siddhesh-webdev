/**
 * Created by Siddhesh on 3/21/2017.
 */
module.exports = function () {
    var mongoose = require("mongoose");
    var pageSchema = require('./page.schema.server');
    var PageModel = mongoose.model('PageModel', pageSchema);

    var api = {
        "createPage": createPage,
        "findAllPagesForWebsite": findAllPagesForWebsite,
        "findPageById": findPageById,
        "updatePage": updatePage,
        "deletePage": deletePage,
        "findAllWidgetsForPage": findAllWidgetsForPage
    };

    return api;

    function createPage(websiteId, page) {
        page._website = websiteId;
        return PageModel.create(page);
    }

    function findAllPagesForWebsite(websiteId) {
        return PageModel.find({"_website": websiteId});
    }

    function findPageById(pageId) {
        return PageModel.findById(pageId);
    }

    function updatePage(pageId, updatedPage) {
        return PageModel.update({"_id": pageId}, {$set: updatedPage});
    }

    function deletePage(pageId) {
        return PageModel.remove({"_id": pageId});
    }

    function findAllWidgetsForPage(pageId) {
        return PageModel.findById(pageId)
            .populate("widgets")
            .exec();
    }
};