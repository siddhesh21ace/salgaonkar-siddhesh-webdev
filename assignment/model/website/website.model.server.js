/**
 * Created by Siddhesh on 3/21/2017.
 */
module.exports = function () {
    var models = null;
    var mongoose = require("mongoose");
    var websiteSchema = require('./website.schema.server');
    var WebsiteModel = mongoose.model('WebsiteModel', websiteSchema);

    var api = {
        "createWebsiteForUser": createWebsiteForUser,
        "findAllWebsitesForUser": findAllWebsitesForUser,
        "findWebsiteById": findWebsiteById,
        "updateWebsite": updateWebsite,
        "deleteWebsite": deleteWebsite,
        "setModels": setModels
    };

    return api;

    function createWebsiteForUser(userId, website) {
        website._user = userId;
        return WebsiteModel.create(website);
    }

    function findWebsiteById(websiteId) {
        return WebsiteModel.findById(websiteId);
    }

    function findAllWebsitesForUser(userId) {
        return WebsiteModel.find({"_user": userId});
    }

    function updateWebsite(websiteId, updatedWebsite) {
        return WebsiteModel.update({"_id": websiteId}, {$set: updatedWebsite});
    }

    function deleteWebsite(websiteId) {
        return WebsiteModel.remove({"_id": websiteId});
    }

    function setModels(_models) {
        models = _models;
    }
};